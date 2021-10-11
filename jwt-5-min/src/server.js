const express = require("express");
const cookieParser = require("cookie-parser");
const path = require("path");
const app = express();
const setupLoginRoute = require("./routes/login");
const setupAddRoute = require("./routes/add");
const PORT = 8080;

app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(cookieParser());

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../public/index.html"));
});

app.get("/welcome", (req, res) => {
  res.sendFile(path.join(__dirname, "../public/welcome.html"));
});

setupLoginRoute(app);
setupAddRoute(app);

app.listen(PORT, () => {
  console.log(`Example app listening at http://localhost:${PORT}`);
});
