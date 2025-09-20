// backend/src/controllers/newsController.js
const { fetchHackerNews } = require("../utils/fetchFeeds");
const News = require("../models/newsModel");

exports.getNews = async (req, res) => {
  try {
    const news = await News.find().sort({ createdAt: -1 }).limit(20);
    res.json(news);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.refreshNews = async (req, res) => {
  try {
    const hackerNews = await fetchHackerNews();
    res.json({ message: "News updated", hackerNews });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
