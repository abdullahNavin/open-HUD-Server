// backend/src/utils/fetchFeeds.js
const axios = require("axios");
const News = require("../models/newsModel");

const HN_API = "https://hacker-news.firebaseio.com/v0";

const fetchHackerNews = async () => {
    try {
        const { data: topIds } = await axios.get(`${HN_API}/topstories.json?print=pretty`);
        const top10 = topIds.slice(0, 20); // Limit for testing
        // console.log(topIds, top10);

        const stories = await Promise.all(
            top10.map(async (id) => {
                const { data } = await axios.get(`${HN_API}/item/${id}.json`);
                console.log(data);
                return {
                    title: data.title,
                    url: data.url || `https://news.ycombinator.com/item?id=${id}`,
                    score: data.score,
                    source: "HackerNews"
                };
            })
        );

        // Save to DB (upsert to avoid duplicates)
        for (let story of stories) {
            await News.updateOne(
                { url: story.url },
                { $set: story },
                { upsert: true }
            );
        }

        return stories;
    } catch (err) {
        console.error("Error fetching HackerNews:", err.message);
        return [];
    }
}

module.exports = { fetchHackerNews };
