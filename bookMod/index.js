const express = require('express')
const cors = require('cors')
const bodyParser  = require('body-parser')

const indexRouter = require('./routes/index')
const bookRouter = require('./routes/book')

const app = express()

app.use(bodyParser.urlencoded({extended : true}))
app.use(cors())

app.use('/public' , express.static(__dirname + 'public'))

app.use('/', indexRouter)
app.use('/api/book', bookRouter)

const PORT = process.env.PORT || 3000
app.listen(PORT, console.log('starting', PORT))