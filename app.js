require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const app = express();
const fs = require("fs");
var ip = require("ip");
app.use(morgan("short"));

const port = "3001";
const apiKey = process.env.API_KEY;

// With git bash:
// curl http://localhost:3001/secret/ -H 'x-api-key: fooBar123$'

app.get("/secret/", (req, res) => {
  const reqKey = req.headers["x-api-key"]
  var ip = req.headers['x-real-ip'] || req.socket.remoteAddress;
  console.log('ip:', ip)
  if (reqKey == apiKey) {
    res.status(500).send("Authorized");
  } else {
    return fs.appendFile("failed.log", `${req.hostname}\n`, (err) => {
      if (err) throw err;
      res.status(401).send("Unauthorized - ip logged");
    });
  }
});

app.listen(port, () => {
  console.log("Server started", ip.address(), port);
});
