// backend/src/routes/newsRoutes.js
const express = require("express");
const router = express.Router();
const { getNews, refreshNews } = require("../controllers/newsController");

router.get("/", getNews);        // GET /api/news → Fetch from DB
router.post("/refresh", refreshNews); // POST /api/news/refresh → Fetch HackerNews API

module.exports = router;
