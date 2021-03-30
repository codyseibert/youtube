const { cookieJwtAuth } = require("../middleware/cookieJwtAuth");

module.exports = (app) =>
  app.post("/add", cookieJwtAuth, (req, res) => {
    console.log(req.user);
    res.redirect("/welcome");
  });
