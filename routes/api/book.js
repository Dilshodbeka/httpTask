const express = require('express')
const router = express.Router();
const passport = require('passport')
// adding authenticate to the pages
// passport.authenticate('jwt', {session: false}),

const {Books} = require('../models/index.js')
//const fileMiddleWare = require('../middleware/downloadFile');
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


router.get('/', (req, res) => {
    Books.find({}, (err, data) => {
        if(err){
            console.log(err);
        }else{
            res.status(200).json(data)
        }
    })

})

router.get('/create', (req, res) => {
    res.status(201).json({message: "created"})
})

router.post('/create', (req, res) => {
    const {title, description, authors, favorite, fileName, fileBook} = req.body
    const newBook = new Books({title, description, authors, favorite, fileName, fileBook})
    try {
        newBook.save()
    } catch (e) {
        console.log('save error'+e);
    }
    res.redirect('/book')
});


router.get('/:id', (req, res) => {
    const {id} = req.params;
    Books.findById(id, (err, data)=> {
        if(err) {
            console.log('get id err', err);
            res.status(404).redirect('/404')
        }else{
            res.render('book/view', {
                title: 'Book | view',
                book: data
            })
        }
    })
})

router.get('/update/:id', (req, res) => {
    const {id} = req.params
    Books.findById(id, (err, data) => {
        if(err){
            console.log(err);
            res.status(404).redirect('/404')
        }else{
            res.render("book/update", {
                title: "Book | view",
                book: data
            })
        }
    })
})

router.post('/update/:id', (req, res) => {
    const {title, description, authors, favorite, fileName, fileBook} = req.body
    const {id} = req.params    
    Books.findByIdAndUpdate(id, {title, description, authors, favorite, fileName, fileBook}, (err)=>{
        if(err) {
            res.status(404).redirect('/404')
            console.log(err);
        }else{
            res.redirect(`/book/${id}/`)
        }
    })
})

router.post('/delete/:id', (req, res) => {
    const {id} = req.params
    Books.findByIdAndDelete(id, (err, data)=> {
        if(err) {
            console.log(err);
            res.status(404).redirect('/404')
        }else{
            res.redirect('/book')
        }
    })
})

module.exports = router