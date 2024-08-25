const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 5000;

// Configure CORS
app.use(cors({
  origin: "http://localhost:3000", // Replace with your frontend URL
  methods: ['GET', 'POST', 'OPTIONS'], // Allow methods
  allowedHeaders: ['Content-Type'] // Allow headers
}));

app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.send("Server is running! Use the /bfhl endpoint for the challenge.");
});

app.post("/bfhl", (req, res) => {
  const { data } = req.body;

  if (!Array.isArray(data)) {
    return res.status(400).json({
      is_success: false,
      message: "Invalid data format. 'data' should be an array."
    });
  }

  const numbers = [];
  const alphabets = [];
  let highestLowercase = null;

  data.forEach((item) => {
    if (!isNaN(item)) {
      numbers.push(item);
    } else if (typeof item === "string" && /^[a-zA-Z]$/.test(item)) {
      alphabets.push(item);
      if (item === item.toLowerCase()) {
        if (!highestLowercase || item > highestLowercase) {
          highestLowercase = item;
        }
      }
    }
  });

  res.json({
    is_success: true,
    user_id: "Charish",
    email: "duvvuru.charish@gmail.com",
    roll_number: "21BCE0680",
    numbers,
    alphabets,
    highest_lowercase_alphabet: highestLowercase ? [highestLowercase] : [],
  });
});

app.get("/bfhl", (req, res) => {
  res.json({ operation_code: 1 });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
