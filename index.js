const express = require("express");
// init app
const app = express();
const http = require('http').createServer(app)
const cors = require("cors");
const bodyParser = require("body-parser");
const io = require('socket.io')(http)
const ejs = require("ejs");
const formatMsg = require('./views/partials/messages')

require("dotenv").config();
// DB
const mongoose = require("mongoose");
// middleware

const PASSWORD = process.env.MDB_PD;
const LOGIN = process.env.MDB_LG;

mongoose
  .connect(
    `mongodb+srv://mydb:${PASSWORD}@books.zae3q.mongodb.net/${LOGIN}?retryWrites=true&w=majority`,
    {
      useNewUrlParser: true,
      useCreateIndex: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
    }
  )
  .then(() => console.log("M connected"))
  .catch((err) => console.log(err));

const loggerMiddleWare = require("./middleware/logger");
const errorMiddleWare = require("./middleware/error");
// routes
const indexRouter = require("./routes/index");
const bookRouter = require("./routes/book");

// sockets
io.on("connection", (socket)=> {
    socket.emit('message', formatMsg('admin', 'welcome all'));
    socket.broadcast.emit('message', formatMsg('admin', 'a user has joined the chat'));

    socket.on('disconnect', ()=> {
        io.emit('message', formatMsg('admin', 'a user has left the chat'))
    })


    // listen chat
    socket.on('chatMessage', (msg)=>{
        io.emit('message', formatMsg('user', msg))
    })
})


// middleware
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(loggerMiddleWare);

// routes
app.use("/files", express.static(__dirname + "public/pdfs"));
app.use("/", indexRouter);
app.use("/book", bookRouter);
app.use("/api/book", bookRouter);

// erroor if
app.use(errorMiddleWare);

// end and start of app
const PORT = process.env.PORT || 3000;

http.listen(PORT, console.log("starting", PORT));
