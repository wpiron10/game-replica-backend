require("dotenv").config();

const express = require("express");
const router = express.Router();
const API = process.env.API;
const axios = require("axios");

// GET : videogame by id

router.get("/games/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const response = await axios.get(
      `https://api.rawg.io/api/games/${id}?key=${API}`
    );

    console.log("je suis dans : gamesbyID");
    console.log("response", response);
    res.json(response.data);
  } catch (error) {
    res.status(400).json(error.message);
  }
});

router.get("/relatedgames", async (req, res) => {
  try {
    const response = await axios.get(
      `https://api.rawg.io/api/games/${req.query.slug}/game-series?key=${API}`
    );

    console.log("je suis dans : gamesbyID");
    console.log("response", response);
    res.json(response.data);
  } catch (error) {
    res.status(400).json(error.message);
  }
});

module.exports = router;
