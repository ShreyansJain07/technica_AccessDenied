const express = require("express");
const axios = require("axios");
const cors = require("cors");
const app = express();
const port = 8000; 
app.use(
  cors({
    origin: "*",
  })
);
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/jobs", async (req, res) => {
  try {
    console.log("hitting server");
    console.log(req.query);
    const  query  = req.query.query.replace(/ /g,"+");
    console.log(query);

    const response = await axios.get(
      `https://serpapi.com/search.json?engine=google_jobs&q=${query}&google_domain=google.com&gl=in&hl=en&api_key=5d1b79b4ee809fa8365d09f2d36a866dda3b7e1e2f93ad1c59726eff1454f4f2`
    );

    res.json(response.data);
  } catch (error) {
    console.error("Error fetching data from SerpAPI:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
