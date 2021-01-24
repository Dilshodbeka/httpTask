const express = require('express')
const cors = require('cors')
const bodyParser  = require('body-parser')
const ejs = require('ejs')

// DB
const mongoose = require('mongoose');
// middleware
const loggerMiddleWare = require('./middleware/logger')
const errorMiddleWare = require('./middleware/error')
// routes
const indexRouter = require('./routes/index')
const bookRouter = require('./routes/book')

const app = express()

app.set('view engine', 'ejs')

app.use(bodyParser.urlencoded({extended : true}))
app.use(cors())
app.use(loggerMiddleWare)


app.use('/files' , express.static(__dirname + 'public/pdfs'))
app.use('/', indexRouter)
app.use('/book', bookRouter)
app.use('/api/book', bookRouter)


app.use(errorMiddleWare)
const PORT = process.env.PORT || 3000

async function start () {
    try {
        await mongoose.connect('mongodb://localhost:27017/mydb');
        app.listen(PORT, console.log('starting', PORT))
    } catch (e) {
        console.log('errorr' + e);
    }
}
start();