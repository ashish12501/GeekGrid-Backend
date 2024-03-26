// Import required modules
import express from "express";
import fetch from "node-fetch";
import cors from "cors"; // Import cors middleware

const app = express();
app.use(cors()); // Use cors middleware to enable CORS

// Define your SerpAPI key
const apiKey =
  "b2333fe6dde0c452cf1a988e98dda9eeb5943e30723d77c65600c474d95c7afe";

// Define a route for fetching jobs
app.get("/jobs", async (req, res) => {
  try {
    const query = req.query.query;
    const jobs = await fetchJobs(query);
    res.json(jobs);
  } catch (error) {
    console.error("Error fetching jobs:", error);
    res.status(500).json({ error: "Failed to fetch jobs" });
  }
});

// Function to fetch jobs from SerpAPI
async function fetchJobs(query) {
  try {
    const response = await fetch(
      `https://serpapi.com/search.json?engine=google_jobs&q=${encodeURIComponent(
        query
      )}&api_key=${apiKey}&hl=en`
    );

    if (!response.ok) {
      throw new Error("Failed to fetch jobs from SerpAPI");
    }

    const data = await response.json();
    console.log(data);
    return data.jobs_results;
  } catch (error) {
    console.error("Error fetching jobs:", error);
    throw error;
  }
}

// Start the server
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
