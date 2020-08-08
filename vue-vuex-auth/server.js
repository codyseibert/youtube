require("dotenv").config();
const express = require("express");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

app.get("/hi", (req, res) => {
  const { authorization } = req.headers;
  const [, token] = authorization.split(" ");
  try {
    jwt.verify(token, process.env.JWT_KEY);
    res.json({
      message: "yo",
    });
  } catch (err) {
    res.status(401);
    res.json({
      error: err,
    });
  }
});

app.post("/login", (req, res) => {
  const USERNAME = "cody";
  const PASSWORD = "123456";

  const { username, password } = req.body;

  if (username === USERNAME && password === PASSWORD) {
    const user = {
      id: 1,
      name: "cody",
      username: "cody",
    };
    const token = jwt.sign(user, process.env.JWT_KEY);
    res.json({
      token,
      user,
    });
  } else {
    res.status(403);
    res.json({
      message: "invalid login information",
    });
  }
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
