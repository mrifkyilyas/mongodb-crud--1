
const {
    MongoClient, ObjectId
} = require('mongodb')
const url = 'mongodb://localhost:27017'
const dbName = 'Booklibrary'
let client = null

class Book {
    constructor(obj) {
        this.id = obj._id
        this.isbn = obj.isbn,
        this.title = obj.title,
        this.author = obj.author,
        this.category = obj.category,
        this.stock = obj.stock
    }
    static findAll() {
        return new Promise((resolve, reject) => {
            client = new MongoClient(url, {
                useNewUrlParser: true
            })
            client.connect()
                .then(() => {
                    let db = client.db(dbName)
                    const collection = db.collection('books')
                    return collection.find({}).toArray()
                })
                .then(books => {
                    let arr = []
                    books.map(book => arr.push(new Book(book)))
                    resolve(arr)  
                    client.close()                  
                })
                .catch((err) => {
                    reject(err)
                    client.close()
                    
                })
        })
    }

    static create(input) {
        console.log('masuk')
        return new Promise((resolve, reject) =>{
            client = new MongoClient(url,{
                useNewUrlParser : true
            })
            client.connect()
            .then(()=>{
                let db = client.db(dbName)
                const collection = db.collection('books')
                return collection.insertOne(input)
            })
            .then(books =>  {
                console.log(books)
                resolve(books)
                client.close()            
            })
            .catch((err) => {
                reject(err)
                client.close()
              
            })
        })
    }


    static update(input,data){
        const { isbn,title,author,category,stock} =  data
        return new Promise((resolve, reject) => {
            client = new MongoClient(url, {
                useNewUrlParser: true
            })
            client.connect()
                .then(() => {                    
                    let db = client.db(dbName)
                    const collection = db.collection('books')
                    return collection.updateOne({
                        _id:ObjectId(input)
                    }, {
                        $set: {
                            isbn,
                            title,
                            author,
                            category,
                            stock
                        }
                    })
                })
                .then(books => {
                    resolve('berhasil mengupdate')
                    client.close()
                })
                .catch((err) => {
                    reject(err)
                    client.close()
                })
        })

    }

    static delete(input){
        return new Promise((resolve, reject) => {
            client = new MongoClient(url, {
                useNewUrlParser: true
            })
            client.connect()
                .then(() => {
                    let db = client.db(dbName)
                    const collection = db.collection('books')
                    return collection.deleteOne({_id:ObjectId(input)})
                })
                .then(books => {
                    resolve('berhasil menghapus')
                    client.close()
                })
                .catch((err) => {
                    reject(err)
                    client.close()
                })
        })
    }

    static findOne(input) {
        return new Promise((resolve, reject) => {
            client = new MongoClient(url, {
                useNewUrlParser: true
            })
            client.connect()
                .then(() => {
                    let db = client.db(dbName)
                    const collection = db.collection('books')
                    return collection.findOne({
                        _id:ObjectId(input)
                    })
                })
                .then(found => {
                    if (found) {
                        resolve(found)
                    } else { 
                        resolve({  msg: 'data tidak cocok' })}

                    client.close()
                })
                .catch(err => {
                    client.close()
                    reject(err)
                })
        })
    }




   
}


module.exports = Book






