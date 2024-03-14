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
    // const query = "full stack developer mumbai";

    // const serpApiUrl = "https://serpapi.com/search";
    // const response = await axios.get(serpApiUrl, {
    //   params: {
    //     api_key:
    //       "98a1671d5b1c1efae84bf3516820fab33875cb7a4e541c9fa4ddc6523eadeb98",
    //     engine: "google_jobs",
    //     lrad: "0",
    //     q: query,
    //     google_domain: "google.com",
    //     gl: "in",
    //   },
    // });

    const response = await axios.get(
      `https://serpapi.com/search.json?engine=google_jobs&q=${query}&google_domain=google.com&gl=in&hl=en&api_key=98a1671d5b1c1efae84bf3516820fab33875cb7a4e541c9fa4ddc6523eadeb98`
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
