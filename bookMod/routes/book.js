const express = require('express')
const router = express.Router();

const {Book, User} = require('../models/index')
const fileMiddleWare = require('../middleware/downloadFile')

const stor = {
    books: [],
    users: []
}
let numbr = [1, 2, 3];
numbr.map(el => {
    const newTodo = new Book(
                            `title ${el}`, 
                            `description ${el}`, 
                            `authors ${el}`,
                            `favorite ${el}`,
                            `fileCover ${el}`,
                            `fileName ${el}`,
                            `fileBook ${el}`
                            );
    stor.books.push(newTodo);
});


router.get('/', (req, res) => {
    const {books} = stor
    res.render('book/index', {
        title: 'Book',
        books: books
    })
})

router.get('/create', (req, res) => {
    res.render("book/create", {
        title: "Book | create",
        book: {},
    });
});


router.post('/create', (req, res) => {
    const {books} = stor
    const {title, description, authors, favorite, fileCover, fileName, fileBook} = req.body

    const newBook = new Book(title, description, authors, favorite, fileCover, fileName, fileBook)

    books.push(newBook)

    res.redirect('/book')
});



router.get('/:id', (req, res) => {
    const {books} = stor;
    const {id} = req.params;

    const idx = books.findIndex(el => el.id === id)
    if (idx !== -1) {
        res.render('book/view', {
            title: 'Book | view',
            book: books[idx]
        })
    }else {
        res.status(404).redirect('/404')
    }
})

router.get('/update/:id', (req, res) => {
    const {books} = stor
    const {title, description, authors, favorite, fileCover, fileName, fileBook} = req.body
    const {id} = req.params


    const idx = books.findIndex(el => el.id === id)
    if(idx !== -1) {
        res.render("book/update", {
            title: "Book | view",
            book: books[idx],
        });
    }else {
        res.status(404).redirect('/404')
    }
})

router.post('/update/:id', (req, res) => {
    const {books} = stor
    const {title, description, authors, favorite, fileCover, fileName, fileBook} = req.body
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
            fileName,
            fileBook
        }

        res.redirect(`/book/${idx}`)
    }else {
        res.status(404).redirect('/404')
    }
})

router.post('/delete/:id', (req, res) => {
    const {books} = stor
    const {id} = req.params
    const idx = books.findIndex(el => el.id === id)

    if(idx !== -1) {
        books.splice(idx, 1)
        res.redirect('/book')
    }else {
        res.status(404).redirect('/404')
    }

})


module.exports = router