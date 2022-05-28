require("dotenv").config();
// Imports des packages
const express = require("express");
// Parametres body
const formidable = require("express-formidable");
// Cross-origin resource sharing
const cors = require("cors");
// affichage des logs transitant dans le serveur dans le terminal (+ L14)
const morgan = require("morgan");
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

// const similargames = require("./routes/similargames");
// app.use(similargames);

// Démarrage du serveur
app.listen(process.env.PORT, () => {
  console.log("Server has started 🎮🚀");
});
