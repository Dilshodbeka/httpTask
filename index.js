const express = require('express')
const cors = require('cors')
const bodyParser  = require('body-parser')
const ejs = require('ejs')

// DB
const mongoose = require('mongoose');
// middleware

mongoose.connect('mongodb://localhost:27017/mydb', 
    {
        useNewUrlParser: true, 
        useCreateIndex:true, 
        useUnifiedTopology: true, 
        useFindAndModify : false 
    }).catch(err => handleError(err))

const loggerMiddleWare = require('./middleware/logger')
const errorMiddleWare = require('./middleware/error')
// routes
const indexRouter = require('./routes/index')
const bookRouter = require('./routes/book')

// init app
const app = express()

// middleware
app.set('view engine', 'ejs')
app.use(bodyParser.urlencoded({extended : true}))
app.use(cors())
app.use(loggerMiddleWare)

// routes
app.use('/files' , express.static(__dirname + 'public/pdfs'))
app.use('/', indexRouter)
app.use('/book', bookRouter)
app.use('/api/book', bookRouter)

// erroor if
app.use(errorMiddleWare)

// end and start of app
const PORT = process.env.PORT || 3000

app.listen(PORT, console.log('starting', PORT))
