const express = require('express')

const Genre = require('../models/Genre.model')

const router = express.Router()

router.get('/getAll', (request, response) => {
    Genre.find().then(result => {
        response.status(200).send(result)
    })
})

router.get('/getAllChecked', (request, response) => {
    Genre.find({ checked: true }).then(result => {
        response.status(200).send(result)
    })
})

router.get('/getAllUnchecked', (request, response) => {
    Genre.find({ checked: false }).then(result => {
        response.status(200).send(result)
    })
})

router.get('/check/:id', (request, response) => {
    const id = request.params.id || '1'
    
    Genre.findOne({ _id: id }).then(result => {
        if (result)
        {
            result.checked = !result.checked
            result.save(err => {
                if(err)
                {
                    response.status(400).send({ message: 'Failed' })
                }else{
                    response.status(200).send({ message: 'Success', check: result.checked })
                }
            })
        }else{
            response.status(400).send({ message: 'Id is not available' })
        }
    })
})

module.exports = router