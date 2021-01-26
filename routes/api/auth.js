const express = require("express");
const router = express.Router();

const { Users } = require("../../models/index.js");

  

router.get("/login", function (req, res) {
});

router.post(
  "/login",
);

router.get(
  "/me",
);

router.post("/signup", async(req, res) => {
  const candidate = await Users.findOne({email: req.body.email})

  if(candidate){
    res.status(409).json({message: "error is not valid"})
  }else{

    const userNew = new Users({
      email: req.body.email,
      password: req.body.password
    })

    try {
      await userNew.save()
      res.status(201).json(userNew)
    } catch (e) {
      console.log(e);
    }

  }

});

module.exports = router;
