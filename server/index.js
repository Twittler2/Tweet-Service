const express = require('express');
const bodyParser = require('body-parser');
const Path = require('path');
const client = require('../database/index.js');

const PORT = 3000;
const app = express();

const randomNumber = Math.floor(Math.random() * 1000000);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.send("Hello Nick! This server's random number is: " + randomNumber + "\n");
})

app.post('/tweets/events', (req, res) => {
  res.send();
});


app.get('/interactors/:tweet_id', (req, res) => {
  console.log('tweet_id', Path.parse(req.path).base);
  const tweetId = Path.parse(req.path).base;
  const query = `SELECT interactors FROM tweets WHERE id='${tweetId}' ALLOW FILTERING;`;
  client.execute(query, (err, result) => {
    if (err) { res.status(500).send(); }
    res.send(result.rows[0].interactors);
  });
});


app.listen(PORT, () => console.log(`Listening on port ${PORT}!`));

module.exports = app;