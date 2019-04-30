const express = require('express')
const route = express.Router()
const {getAll,create,update,deleteOne,getOne} = require('../controllers/book') 

route.get('/',getAll)
route.get('/:id',getOne)
route.post('/',create)
route.put('/:id',update)
route.delete('/:id',deleteOne)







module.exports = route