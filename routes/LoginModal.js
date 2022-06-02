const express = require("express");
const router = express.Router();

const mongoose = require("mongoose");
const cloudinary = require("cloudinary").v2;

// import of User
const User = require("../models/User");

const SHA256 = require("crypto-js/sha256");
const encBase64 = require("crypto-js/enc-base64");
const uid2 = require("uid2");

// **Create**
router.post("/user-login", async (req, res) => {
  // console.log(req.fields);

  try {
    const getMyUser = await User.findOne({ email: req.fields.email });

    if (getMyUser) {
      const salt = getMyUser.salt;

      const hashCheck = SHA256(req.fields.password + salt).toString(encBase64);
      if (getMyUser.hash === hashCheck) {
        console.log("heyyy =>", getMyUser);
        console.log(getMyUser);
        res.status(200).json(getMyUser);
      }
      if (getMyUser.hash !== hashCheck) {
        res.status(400).json({ message: "Wrong email or password" });
      }

      // const passwordCheck=
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});
module.exports = router;
