const express = require('express')
const router = express.Router();

const {Book, User} = require('../models/index')

const stor = {
    books: [],
    users: []
}
let numbr = [1, 2, 3];
numbr.map(el => {
    const newTodo = new Book(`id ${el}`,
                            `title ${el}`, 
                            `description ${el}`, 
                            `authors ${el}`,
                            `favorite ${el}`,
                            `fileCover ${el}`,
                            `fileName ${el}`,
                            );
    stor.books.push(newTodo);
});


router.get('/', (req, res) => {
    const {books} = stor
    res.json(books)
})

router.get('/:id', (req, res) => {
    const {books} = stor;
    const {id} = req.params;

    const idx = books.findIndex(el => el.id === id)
    if (idx !== -1) {
        res.json(books[idx])
    }else {
        res.status(404);
        res.json()
    }
})

router.post('/', (req, res) => {
    const {books} = stor
    const {title, description, authors, favorite, fileCover, fileName} = req.body

    const newBook = new Book(title, description, authors, favorite, fileCover, fileName)

    books.push(newBook)

    res.status(201).json(newBook)
})

router.put('/:id', (req, res) => {
    const {books} = stor
    const {title, description, authors, favorite, fileCover, fileName} = req.body
    const {id} = req.params


    const idx = books.findIndex(el => el.id === id)
    if(idx !== -1) {
        books[idx] = {
            ...books[idx],
            title,
            description,
            authors,
            favorite,
            fileCover,
            fileName
        }

        res.json(books[idx])
    }else {
        res.status(404).json('book | not found (((')
    }
})

router.delete('/:id', (req, res) => {
    const {books} = stor
    const {id} = req.params

    const idx = books.findIndex(el => el.id === id)
    if(idx !== -1) {
        books.splice(idx, 1)
        res.json(true)
    }else {
        res.status(404).json('book | not found (')
    }

})

// router.post('/user/login', (req, res)=> {
//     const {users} = stor
//     const {mail} = req.body

//     const newUser = new User(mail)

//     users.push(newUser)
//     res.status(201).json(newUser)
// })

module.exports = router