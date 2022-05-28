require("dotenv").config();
const API = process.env.API;

const express = require("express");
const router = express.Router();
const axios = require("axios");
// GET : all video games on Homepage

router.get("/", async (req, res) => {
  try {
    let page = "";
    if (req.query.page) {
      page = page + `&page=${req.query.page}`;
    }

    let search = "";
    if (req.query.search) {
      search = search + `&search=${req.query.search}`;
    }

    let parentPlatform = "";
    if (req.query.parentPlatform) {
      parentPlatform =
        parentPlatform + `&parent_platforms=${req.query.parentPlatform}`;
    }

    let platform = "";
    if (req.query.platform) {
      platform = platform + `&platforms=${req.query.platform}`;
    }

    let order = "";
    if (req.query.order) {
      order = order + `&ordering=${req.query.order}`;
    }

    const response = await axios.get(
      `https://api.rawg.io/api/games?key=${API}${page}${search}${parentPlatform}${platform}${order}`
    );

    //&platforms=${req.query.platform}
    console.log("je suis dans : allgames ");
    console.log("response", response);
    res.json(response.data);
  } catch (error) {
    res.status(400).json(error.message);
  }
});

module.exports = router;
