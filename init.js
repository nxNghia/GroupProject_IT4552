const Genre = require("./models/Genre.model")


const cate = [
    {
        "href": "https://api.spotify.com/v1/browse/categories/toplists",
        "icons": [
            {
                "height": 275,
                "url": "https://t.scdn.co/media/derived/toplists_11160599e6a04ac5d6f2757f5511778f_0_0_275_275.jpg",
                "width": 275
            }
        ],
        "id": "toplists",
        "name": "Top Lists"
    },
    {
        "href": "https://api.spotify.com/v1/browse/categories/vietnamese",
        "icons": [
            {
                "height": null,
                "url": "https://t.scdn.co/images/6e1202d14b1f400592532c10d10871ef.jpeg",
                "width": null
            }
        ],
        "id": "vietnamese",
        "name": "Nhạc Việt"
    },
    {
        "href": "https://api.spotify.com/v1/browse/categories/kpop",
        "icons": [
            {
                "height": null,
                "url": "https://t.scdn.co/images/2078afd91e4d431eb19efc5bee5ab131.jpeg",
                "width": null
            }
        ],
        "id": "kpop",
        "name": "K-Pop"
    },
    {
        "href": "https://api.spotify.com/v1/browse/categories/pop",
        "icons": [
            {
                "height": 274,
                "url": "https://t.scdn.co/media/derived/pop-274x274_447148649685019f5e2a03a39e78ba52_0_0_274_274.jpg",
                "width": 274
            }
        ],
        "id": "pop",
        "name": "Pop"
    },
    {
        "href": "https://api.spotify.com/v1/browse/categories/chill",
        "icons": [
            {
                "height": 274,
                "url": "https://t.scdn.co/media/derived/chill-274x274_4c46374f007813dd10b37e8d8fd35b4b_0_0_274_274.jpg",
                "width": 274
            }
        ],
        "id": "chill",
        "name": "Thư giãn"
    },
    {
        "href": "https://api.spotify.com/v1/browse/categories/mood",
        "icons": [
            {
                "height": 274,
                "url": "https://t.scdn.co/media/original/mood-274x274_976986a31ac8c49794cbdc7246fd5ad7_274x274.jpg",
                "width": 274
            }
        ],
        "id": "mood",
        "name": "Tâm trạng"
    },
    {
        "href": "https://api.spotify.com/v1/browse/categories/romance",
        "icons": [
            {
                "height": 274,
                "url": "https://t.scdn.co/media/derived/romance-274x274_8100794c94847b6d27858bed6fa4d91b_0_0_274_274.jpg",
                "width": 274
            }
        ],
        "id": "romance",
        "name": "Không gian lãng mạn"
    },
    {
        "href": "https://api.spotify.com/v1/browse/categories/hiphop",
        "icons": [
            {
                "height": 274,
                "url": "https://t.scdn.co/media/original/hip-274_0a661854d61e29eace5fe63f73495e68_274x274.jpg",
                "width": 274
            }
        ],
        "id": "hiphop",
        "name": "Hip-Hop"
    },
    {
        "href": "https://api.spotify.com/v1/browse/categories/edm_dance",
        "icons": [
            {
                "height": 274,
                "url": "https://t.scdn.co/media/derived/edm-274x274_0ef612604200a9c14995432994455a6d_0_0_274_274.jpg",
                "width": 274
            }
        ],
        "id": "edm_dance",
        "name": "Dance/Điện tử"
    },
    {
        "href": "https://api.spotify.com/v1/browse/categories/wellness",
        "icons": [
            {
                "height": null,
                "url": "https://t.scdn.co/images/3710b68657574bc79df14bd74629e5ac",
                "width": null
            }
        ],
        "id": "wellness",
        "name": "Sức khỏe"
    },
    {
        "href": "https://api.spotify.com/v1/browse/categories/pride",
        "icons": [
            {
                "height": null,
                "url": "https://t.scdn.co/images/c5495b9f0f694ffcb39c9217d4ed4375",
                "width": null
            }
        ],
        "id": "pride",
        "name": "Pride"
    },
    {
        "href": "https://api.spotify.com/v1/browse/categories/equal",
        "icons": [
            {
                "height": null,
                "url": "https://t.scdn.co/images/084155aeaa724ea1bd393a017d67b709",
                "width": null
            }
        ],
        "id": "equal",
        "name": "EQUAL"
    },
    {
        "href": "https://api.spotify.com/v1/browse/categories/indie_alt",
        "icons": [
            {
                "height": null,
                "url": "https://t.scdn.co/images/fe06caf056474bc58862591cd60b57fc.jpeg",
                "width": null
            }
        ],
        "id": "indie_alt",
        "name": "Indie"
    },
    {
        "href": "https://api.spotify.com/v1/browse/categories/at_home",
        "icons": [
            {
                "height": null,
                "url": "https://t.scdn.co/images/04da469dd7be4dab96659aa1fa9f0ac9.jpeg",
                "width": null
            }
        ],
        "id": "at_home",
        "name": "Ở nhà"
    },
    {
        "href": "https://api.spotify.com/v1/browse/categories/gaming",
        "icons": [
            {
                "height": null,
                "url": "https://t.scdn.co/images/0d39395309ba47838ef12ce987f19d16.jpeg",
                "width": null
            }
        ],
        "id": "gaming",
        "name": "Chơi game"
    },
    {
        "href": "https://api.spotify.com/v1/browse/categories/alternative",
        "icons": [
            {
                "height": null,
                "url": "https://t.scdn.co/images/ee9451b3ed474c82b1da8f9b5eafc88f.jpeg",
                "width": null
            }
        ],
        "id": "alternative",
        "name": "Alternative"
    },
    {
        "href": "https://api.spotify.com/v1/browse/categories/sleep",
        "icons": [
            {
                "height": 274,
                "url": "https://t.scdn.co/media/derived/sleep-274x274_0d4f836af8fab7bf31526968073e671c_0_0_274_274.jpg",
                "width": 274
            }
        ],
        "id": "sleep",
        "name": "Ngủ ngon"
    },
    {
        "href": "https://api.spotify.com/v1/browse/categories/instrumental",
        "icons": [
            {
                "height": null,
                "url": "https://t.scdn.co/images/384c2b595a1648aa801837ff99961188",
                "width": null
            }
        ],
        "id": "instrumental",
        "name": "Nhạc không lời"
    },
    {
        "href": "https://api.spotify.com/v1/browse/categories/holidays",
        "icons": [
            {
                "height": null,
                "url": "https://t.scdn.co/images/dec76a385201436281efb6796a54f479.jpeg",
                "width": null
            }
        ],
        "id": "holidays",
        "name": "Nghỉ lễ vui vẻ"
    },
    {
        "href": "https://api.spotify.com/v1/browse/categories/focus",
        "icons": [
            {
                "height": 274,
                "url": "https://t.scdn.co/media/original/genre-images-square-274x274_5e50d72b846a198fcd2ca9b3aef5f0c8_274x274.jpg",
                "width": 274
            }
        ],
        "id": "focus",
        "name": "Tập trung"
    }
  ]

const init = () => {
    const cates = []

    try
    {
        cate.forEach(c => {
            const cate_promise_instace = new Promise((resolve, reject) => {
                const cate_constance = new Genre({
                    id: c.id,
                    name: c.name,
                    image: c.icons[0].url,
                    checked: false
                })
        
                cate_constance.save(err => {
                    if(err)
                    {
                        reject({ message: 'Failed' })
                    }else{
                        resolve({id: c.id, name: c.name.includes, image: c.icons[0].url, checked: false})
                    }
                })
            })
    
            cates.push(cate_promise_instace)
        })
    
        Promise.all(cates).then(response => {
            console.log( response )
        })
    }catch(err)
    {
        console.log(err)
    }
}

module.exports = init