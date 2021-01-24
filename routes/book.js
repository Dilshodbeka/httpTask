const express = require('express')
const router = express.Router();


const {BookM} = require('../models/index')
const fileMiddleWare = require('../middleware/downloadFile');

const newBook = new BookM({
    title: 'title.',
    description: 'description.',
    authors: 'authors.',
    favorite: 'favorite.',
    fileCover: false,
    fileName: 'filename.',
    fileBook: 'file book,'
})

router.get('/', (req, res) => {
    res.render('book/index', {
        title: 'Book',
        book: newBook
    })
})

router.get('/create', (req, res) => {
    res.render("book/create", {
        title: "Book | create",
        book: {},
    });
});


router.post('/create', (req, res) => {
    const {title, description, authors, favorite, fileCover, fileName, fileBook} = req.body
    const newBook = new BookM(title, description, authors, favorite, fileCover, fileName, fileBook)

    try {
        newBook.save()
    } catch (e) {
        console.log('save error'+e);
    }

    res.redirect('/book')
});


// undone feature uploading books and adding database
// router.post('/upload-img',  (req, res)=> {
//     if (req.file) {
//         const {path} = req.file
        
//         console.log('added ',path);
//         res.redirect('/book')
//     }else {
//         res.render(null)
//     }
// })


router.get('/:id', (req, res) => {
    const {id} = req.params;
    const bookIdx = BookM.findById(id).select('-__v')
    if (bookIdx !== -1) {
        res.render('book/view', {
            title: 'Book | view',
            book: bookIdx
        })
    }else {
        res.status(404).redirect('/404')
    }
})

router.get('/update/:id', (req, res) => {
    const {books} = stor
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
        res.redirect(`/book/${id}/`)
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