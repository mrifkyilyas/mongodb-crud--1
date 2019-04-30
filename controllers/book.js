const Book = require('../models/book')
class Controller {
    static getAll(req, res) {
        Book.findAll()
            .then(books => {
                res.status(200).json(books)
            })
            .catch(err => {
                res.status(500).json(err)
            })
    }


    static getOne(req,res){
        Book.findOne(req.params.id)
        .then( book => {
            res.status(200).json(book)
        })
        .catch( err => {
            res.status(500).json(err)
        })

    }
    static create(req, res) {
        const { isbn, title, author, category, stock } = req.body
        Book.create({ isbn, title, author, category, stock })
            .then(book => {
                res.status(200).json(book)
            })
            .catch(err => {
                res.status(500).json(err)
            })
    }

    static update(req, res) {
        Book.update(req.params.id, req.body)
            .then(book => {
                res.status(200).json(book)
            })
            .catch(err => {
                res.status(500).json(err)
            })
    }

    static deleteOne(req, res) {
        Book.delete(req.params.id)
            .then(book => {
                res.status(200).json(book)
            })
            .catch(err => {
                res.status(500).json(err)
            })
    }
}

module.exports = Controller