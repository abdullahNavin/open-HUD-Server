const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require("dotenv").config();

const PORT = process.env.PORT || 5000;

const app = express()
app.use(cors());
app.use(express.json());

const newsRoutes = require("./routers/NewsRouters");
const uri = process.env.DB_URL;

// Routes
app.use("/api/news", newsRoutes);

// MongoDB Connection
mongoose
  .connect(process.env.DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("✅ MongoDB Connected");
    console.log("📂 Using Database:", mongoose.connection.name);
  })
  .catch((err) => console.error("❌ MongoDB Connection Error:", err));


app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});