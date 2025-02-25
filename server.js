const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv").config();
const app = express();
app.use(express.json());
app.use(cors());

const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(process.env.genApi);

app.post("/", async (req, res) => {
  const { prompt } = req.body;

  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

  const result = await model
    .generateContent(prompt)
    .then((data) => res.json(data.response.text()));
});

app.listen(3001, async () => {
  console.log(`listening on port ${process.env.port}`);
});
