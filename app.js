require('dotenv').config()
const express = require('express');
const morgan = require('morgan');
const app = express();
var ip = require('ip');
app.use(morgan('short'));

const port = '3001'
const apiKey = process.env.API_KEY

// With git bash:
// curl http://localhost:3001/secret/ -H 'x-api-key: fooBar123$'

app.get("/secret/", (req, res) => {
    console.log('this the api-key:', apiKey)
    console.log(req.headers)
      res.status(500).send(apiKey);
    }
  );


app.listen(port, () => {
    console.log('Server started', ip.address(),port);
  });