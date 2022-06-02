const mongoose = require("mongoose");

const User = mongoose.model("User", {
  username: {
    type: String,
    default: "",
  },
  email: {
    type: String,
  },
  password: {
    type: String,
  },
  picture: Object,
  token: String,
  hash: String,
  salt: String,
});

module.exports = User;
