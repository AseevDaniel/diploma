const express = require("express");
const path = require("path");
const historyMode = require("connect-history-api-fallback");

const app = express();

const staticFileMiddleware = express.static(path.join(__dirname + "/build"));

app.use(staticFileMiddleware);
app.use(
  historyMode({
    disableDotRule: true,
    verbose: true,
  })
);
app.use(staticFileMiddleware);

app.get("/", function (req, res) {
  res.render(path.join(__dirname + "/build/index.html"));
});

var server = app.listen(process.env.PORT || 3000, function () {
  var port = server.address().port;
  console.log("App now running on port", port);
});
