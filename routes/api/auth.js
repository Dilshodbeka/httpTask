const express = require("express");
const router = express.Router();
//login hash
const bcrypt = require("bcrypt");
// token jwt
const jwt = require("jsonwebtoken");
// db
const { User } = require("../../models/index.js");
const jwtTokenNotKey = process.env.JWT_TOKEN;


// adding authenticate to the pages
// passport.authenticate('jwt', {session: false}),


router.get("/login", async function (req, res) {
  // we can use for web page
  res.render('partials/auth', {
   title: 'Book'
})
});

router.post("/login", async function (req, res) {
  const candidate = await User.findOne({ email: req.body.email });

  if (candidate) {
    const passwordResult = bcrypt.compareSync(
      req.body.password,
      candidate.password
    );

    if (passwordResult) {
      const token = jwt.sign(
        {
          userId: candidate._id,
          email: candidate.email,
        },
        jwtTokenNotKey,
        { expiresIn: 60 * 60 }
      );
      
      res.status(200).json({
        token: `Bearer ${token}`
      })
      // res.redirect('/api/user/me') for web page not api we can you
    } else {
      res.status(401).json({
        message: "password not valid",
      });
    }
  } else {
    res.status(404).json({
      message: "no email here",
    });
  }
});

router.get("/me", (req, res)=> {
  res.status(201).json({message: "welcome to your page"})
  // res.redirect('/')
  // after here will work this one
});

router.post("/signup", async (req, res) => {
  const candidate = await User.findOne({ email: req.body.email });

  if (candidate) {
    //error
    res.status(409).json({
      message: "Not valid sorry",
    });
  } else {
    const salt = bcrypt.genSaltSync(10);
    const password = req.body.password;
    const user = new User({
      email: req.body.email,
      password: bcrypt.hashSync(password, salt),
    });

    try {
      await user.save();
      res.status(201).json(user);
    } catch (err) {
      console.log(err);
    }
  }
});

module.exports = router;
