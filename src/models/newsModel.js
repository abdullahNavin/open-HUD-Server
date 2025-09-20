// backend/src/models/newsModel.js
const mongoose = require("mongoose");

const newsSchema = new mongoose.Schema({
  title: String,
  url: String,
  source: String, // e.g., "HackerNews", "Reddit", etc.
  score: Number,  // popularity metric (upvotes, likes, etc.)
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("News", newsSchema);
