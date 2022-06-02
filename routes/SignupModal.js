const express = require("express");
const router = express.Router();

const mongoose = require("mongoose");
const User = require("../models/User");
const cloudinary = require("cloudinary").v2;

const SHA256 = require("crypto-js/sha256");
const encBase64 = require("crypto-js/enc-base64");
const uid2 = require("uid2");

// **Create**
router.post("/user-signup", async (req, res) => {
  console.log("route : /user-signup");
  console.log(req.fields);

  // import of User
  const User = require("../models/User");

  try {
    const password = req.fields.password;
    const salt = uid2(16);
    const hash = SHA256(password + salt).toString(encBase64);
    const token = uid2(16);

    // if (!req.fields.username) {
    //   res.status(401).json({
    //     error: "Username manquant, veuillez donner un username pour continuer.",
    //   });
    // } else {
    // const isUserEmailExisting = await User.findOne({
    //   email: req.fields.email,
    // });

    // console.log(isUserEmailExisting, "isuseremailexisting");
    // if (isUserEmailExisting) {
    //   res.status(403).json({ error: "Email déjà utilisé" });
    // } else {
    // send to cloudinary
    const pictureToUpload = req.files.picture.path;
    const result = await cloudinary.uploader.upload(pictureToUpload, {
      folder: "/Gamepad",
    });

    // User model
    const newUser = new User({
      username: req.fields.username,
      email: req.fields.email,
      picture: result.secure_url,
      hash: hash,
      salt: salt,
      token: token,
    }); // On sauvegarde ensuite "newUser" dans la BDD :
    await newUser.save();

    res.status(200).json(newUser);

    // }
    // }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});
module.exports = router;
