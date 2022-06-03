require("dotenv").config();
// Imports des packages
const express = require("express");

// Parametres body
const formidable = require("express-formidable");
// Cross-origin resource sharing
const cors = require("cors");
// affichage des logs transitant dans le serveur dans le terminal
const morgan = require("morgan");

const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/Gamepad");

const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: "dskrnrcct",
  api_key: "669744172887151",
  api_secret: "4CW175irlMZTjOfNVsj6ppvAj3M",
});

// création du serveur :
const app = express();
app.use(formidable());
app.use(cors());
app.use(morgan("dev"));

//  import des routes
const allgames = require("./routes/allgames");
app.use(allgames);

const gamebyid = require("./routes/gamebyid");
app.use(gamebyid);

const SignupModal = require("./routes/SignupModal");
app.use(SignupModal);

const LoginModal = require("./routes/LoginModal");
app.use(LoginModal);

// const similargames = require("./routes/similargames");
// app.use(similargames);
// app.all("*", (req, res) => {
//   console.log("okokokokok");
// });

// Démarrage du serveur
app.listen(process.env.PORT, () => {
  console.log("Server has started 🎮🚀");
});
