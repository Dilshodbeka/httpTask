const { Schema, model } = require("mongoose");

const userSchema = new Schema({
  email: {
    type: String,
    required: false,
    unique: true
  },
  password: {
    type: String,
    required: false,
  },
});

module.exports = model("User", userSchema);
