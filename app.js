require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const app = express();
var ip = require("ip");
app.use(morgan("short"));

const port = "3001";
const apiKey = process.env.API_KEY;

// With git bash:
// curl http://localhost:3001/secret/ -H 'x-api-key: fooBar123$'

app.get("/secret/", (req, res) => {
  const reqKey = req.headers["x-api-key"];
  if (reqKey == apiKey) {
    res.status(500).send("Authorized");
  } else {
    res.status(401).send("Access denied!");
  }
});

app.listen(port, () => {
  console.log("Server started", ip.address(), port);
});
