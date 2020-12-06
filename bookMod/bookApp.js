const express = require('express')
const cors = require('cors')
const formData = require('express-form-data')

const {Book} = require('./models/index')

const stor = {
    books: [],
}
let numbr = [1, 2, 3];
numbr.map(el => {
    const newTodo = new Book(`title ${el}`, `auther todo ${el}`, `desc ${el}`);
    stor.books.push(newTodo);
});

const app = express()

app.use(formData.parse())
app.use(cors())

app.get('/api/book/', (req, res) => {
    const {books} = stor
    console.log(books);
    res.json(books)
})

app.get('/api/book/:id', (req, res) => {
    const {books} = stor;
    const {id} = req.params;

    const idx = books.findIndex(el => el.id === id)
    console.log('idx ', idx);
    if (idx !== -1) {
        res.json(books[idx])
    }else {
        res.status(404);
        res.json()
    }
})

app.post('/api/book/', (req, res) => {
    const {books} = stor
    const {title, auther, desc} = req.body

    const newBook = new Book(title, auther, desc)

    books.push(newBook)

    res.status(200).json(newBook)
})

app.put('/api/book/:id', (req, res) => {
    const {books} = stor
    const {title, auther, desc} = req.body
    const {id} = req.params


    const idx = books.findIndex(el => el.id === id)
    if(idx !== -1) {
        books[idx] = {
            ...books[idx],
            title,
            auther,
            desc
        }

        res.json(books[idx])
    }else {
        res.status(404).json('book | not found (((')
    }
})

app.delete('/api/book/:id', (req, res) => {
    const {books} = stor
    const {id} = req.params

    const idx = books.findIndex(el => el.id === id)
    if(idx !== -1) {
        books.splice(idx, 1)
        res.json(true)
    }else {
        res.status(404).json('book | not found (((')
    }

})


const PORT = process.env.PORT || 3000
app.listen(PORT, console.log('starting', PORT))