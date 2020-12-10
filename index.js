const express = require('express')
const cors = require('cors')
const bodyParser  = require('body-parser')

const loggerMiddleWare = require('./middleware/logger')
const errorMiddleWare = require('./middleware/error')

const indexRouter = require('./routes/index')
const bookRouter = require('./routes/book')

const app = express()

app.use(bodyParser.urlencoded({extended : true}))
app.use(cors())
app.use(loggerMiddleWare)

app.use('/files' , express.static(__dirname + 'public'))

app.use('/', indexRouter)
app.use('/api/book', bookRouter)


app.use(errorMiddleWare)
const PORT = process.env.PORT || 3000
app.listen(PORT, console.log('starting', PORT))