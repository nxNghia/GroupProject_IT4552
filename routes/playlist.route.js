const { response } = require('express')
const express = require('express')

const User = require('../models/User.model')
const Playlist = require('../models/Playlist.model')

const router = express.Router()

// Lấy về danh sách những playlist được tạo bởi người dùng có id là userId
router.get('/:userId', (request, response) => {
    const userId = request.params.userId

    try
    {
        Playlist.find({ 'owner.id': userId }).then(result => {
            response.status(200).send(result)
        })
    }catch(err)
    {
        response.status(400).send({ message: 'Failed' })
    }
})

// Tạo mới 1 playlist
router.post('/create', (request, response) => {
    const req_data = request.body.playlist_info
    const new_playlist = new Playlist({
        name: req_data.name,
        images: req_data.image,
        tracks: {
            songs: [],
            total: 0
        },
        owner: req_data.owner
    })

    try
    {
        new_playlist.save((err, result) => {
            if (err) {
                response.status(200).send({ message: "Failed" })
            }else{
                response.status(200).send({ message: "Success", result: result })
            }
        })
    }catch(err)
    {
        response.status(400).send({ message: 'Failed' })
    }
})

// Bổ sung 1 bài hát mới vào playlist
router.post('/add', (request, response) => {
    const playlist_id = request.body.playlist_id
    const new_song = request.body.song

    try
    {
        Playlist.findOne({ _id: playlist_id }).then(result => {
            if(result)
            {
                if(result.tracks.songs.some(song => song.track.id === new_song.id))
                {
                    response.status(200).send({ message: 'Duplicate' }) //Nếu trùng thì trả về thông báo tương ứng
                }else{
                    result.tracks.total = result.tracks.songs.length + 1
                    result.tracks.songs.push(new_song)
    
                    result.save(err => {
                        if (err) console.log(err)
                        response.status(200).send({ message: err ? 'Failed to save' : 'Success' })  //Nếu thành công hay thất bại, trả về message tương ứng
                    })
                }
            }else{
                response.status(200).send({ message: 'Unavailable' })   //Không tìm thấy playlist
            }
        })
    }catch(err)
    {
        response.status(400).send({ message: 'Failed' })    //Lỗi
    }
})

// Thay đổi thông tin của playlist (trong trường hợp này là tên)
// Nhận vào 2 tham số
// id playlist cần thay đổi
// tên mới
router.post('/update', (request, response) => {
    const playlist_id = request.body.playlist_id
    const new_name = request.body.new_name

    try
    {
        Playlist.findOne({ _id: playlist_id }).then(result => {
            if(result)
            {
                result.name = new_name
                result.save((err, result2) => {
                    if (err)
                    {
                        response.status(200).send({ message: "Failed", result: result })    //Thất bại
                    }else{
                        response.status(200).send({ message: "Success", result: result2 })  //Thành công
                    }
                })
            }else{
                response.status(200).send({ message: "Unavailable" })   //Không tìm thấy playlist
            }
        })
    }catch(err)
    {
        response.status(400).send({ message: 'Failed' })    //Lỗi
    }
})

//Xóa playlist
// Nhận vào id của playlist
router.post('/remove', (request, response) => {
    const id = request.body.id

    try
    {
        Playlist.deleteOne({ _id: id }).then(() => {
            User.find().then(users => {
                users.forEach(user => {
                    if(user.follow_playlists.includes(id))
                    {
                        user.follow_playlists = user.follow_playlists.filter(_id_ => _id_ !== id)
                    }
                })

                response.status(200).send({ message: 'Success', id: id })
            })
        }).catch(err => response.status(200).send({ message: 'Failed', error: err }))
    }catch(err)
    {
        response.status(400).send({ message: 'Failed' })
    }
})

//Lấy danh sách những playlist không thuộc sở hữu của một người dùng
//Dành cho chức năng gợi ý những playlist của người dùng khác
router.get('/else/:id', (request, response) => {
    const user_id = request.params.id

    try
    {
        Playlist.find({ 'owner.id': { $not: { $regex: user_id + '' } } }).then((result = []) => {
            response.status(200).send({ message: 'Success', playlists: result })
        })
    }catch(err)
    {
        response.status(400).send({ message: 'Failed' })
    }
})

//Thực hiện việc follow 1 playlist của người khác
//Nhận vào id của người đi follow và id của playlist được follow
router.post('/follow', (request, response) => {
    const user_id = request.body.user_id
    const playlist_id = request.body.playlist_id

    try
    {
        User.findOne({ token: user_id }).then(result => {
            if(result)
            {
                const index = result.follow_playlists.findIndex(playlist => playlist === playlist_id)
    
                if(index === -1)
                {
                    result.follow_playlists.push(playlist_id)
                }else{
                    result.follow_playlists.splice(index, 1)
                }
    
                result.save((err) => {
                    if (err)
                    {
                        response.status(200).send({ message: 'Failed to save' })
                    }else{
                        const playlists = []
    
                        result.follow_playlists.forEach(playlist_id => {
                            const playlist = new Promise((resolve, reject) => {
                                Playlist.findOne({ _id: playlist_id })
                                .then(result2 => {
                                    if(result2)
                                    {
                                        resolve(result2)
                                    }else{
                                        reject(result2)
                                    }
                                })
                            })
    
                            playlists.push(playlist)
                        });
    
                        Promise.all(playlists).then((result2 = []) => response.status(200).send({ message: 'Success', playlists: result2 }))
                    }
                })
            }else{
                response.status(200).send({ message: 'Failed to find user' })
            }
        })
    }catch(err)
    {
        response.status(400).send({ message: 'Failed' })
    }
})

//Trả về danh sách những playlist đã follow của một người dùng
//Nhận vào id của người dùng
router.get('/followed/:userId', (request, response) => {
    const userId = request.params.userId

    try
    {
        User.findOne({ token: userId })
        .then(result => {
                const playlists = []

                result.follow_playlists.forEach(playlist_id => {
                    const playlist = new Promise((resolve, reject) => {
                        Playlist.findOne({ _id: playlist_id })
                        .then(result2 => {
                            resolve(result2)
                        })
                    })

                    playlists.push(playlist)
                });

                Promise.all(playlists).then((result2) => {
                    response.status(200).send({ message: 'Success', playlists: result2 })
                })
        })
    }catch(err)
    {
        console.log(err)
        response.status(400).send({ message: 'Failed' })
    }
})

module.exports = router