const express = require('express')

const Genre = require('../models/Genre.model')

const router = express.Router()

// Lấy thông tin về tất cả các genre nhạc được lưu trên database
// Trả về theo dạng
// [{ _id: ..., name: ..., image: ..., id: ... }] (_id dùng để làm index trên Mongo, id dùng khi tìm kiếm trên Spotify API)
router.get('/getAll', (request, response) => {
    Genre.find().then(result => {
        response.status(200).send(result)
    })
})

// Lấy thông tin về tất cả các genre nhạc được admin cho phép xuất hiện trên client
// Trả về giống như trên
router.get('/getAllChecked', (request, response) => {
    Genre.find({ checked: true }).then(result => {
        response.status(200).send(result)
    })
})

// Lấy thông tin về tất cả các genre nhạc không được admin cho phép xuất hiện trên client
// Trả về giống như trên
router.get('/getAllUnchecked', (request, response) => {
    Genre.find({ checked: false }).then(result => {
        response.status(200).send(result)
    })
})

// Khi admin muốn thay đổi trạng thái của 1 genre, muốn hay không muốn genre đó xuất hiện trên client
// api nhận biến đầu vào là _id của genre
router.get('/check/:id', (request, response) => {
    const id = request.params.id
    
    Genre.findOne({ _id: id }).then(result => {
        if (result)
        {
            result.checked = !result.checked
            result.save(err => {
                if(err)
                {
                    response.status(400).send({ message: 'Failed' })    //Nếu lỗi trả về message: Failed
                }else{
                    response.status(200).send({ message: 'Success', check: result.checked })    //Nếu thành công trả về message tương ứng, cùng với trạng thái mới, checked === true hoặc checked === false
                }
            })
        }else{
            response.status(400).send({ message: 'Id is not available' })   // Nếu không tìm thấy _id
        }
    })
})

module.exports = router