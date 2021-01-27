const express = require("express");
// init app
const app = express();
const http = require("http").createServer(app);
const cors = require("cors");
const bodyParser = require("body-parser");
const io = require("socket.io")(http);
const ejs = require("ejs");
// passport
const passport = require("passport");

// need to modify
const formatMsg = require("./views/partials/messages");

// .env
require("dotenv").config();
// DB
const mongoose = require("mongoose");
// middleware

const uri = process.env.MONGODB_URI;

mongoose
  .connect(uri, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  })
  .then(() => console.log("M connected"))
  .catch((err) => console.log(err));

const loggerMiddleWare = require("./middleware/logger");
const errorMiddleWare = require("./middleware/error");
// routes
const indexRouter = require("./routes/index");
const bookRouter = require("./routes/book");
//const bookApiRouter = require("./routes/api/book");
const authApiRouter = require("./routes/api/auth");












// sockets
io.on("connection", (socket) => {

  console.log(`new ${socket.id}`);
  socket.on('comment', (data)=>{
    data.time = Date()
    socket.broadcast.emit('comment', data)
  })
});

















// middleware
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(express.json());
app.use(loggerMiddleWare);
app.use(passport.initialize());
require("./middleware/passport")(passport);

// routess
app.use("/files", express.static(__dirname + "public/pdfs"));
app.use("/", indexRouter);
app.use("/book", bookRouter);
app.use("/api/book", bookRouter);
app.use("/api/user", authApiRouter);

// erroor if
app.use(errorMiddleWare);

// end and start of app
const PORT = process.env.PORT || 3000;

http.listen(PORT, console.log("starting", PORT));
