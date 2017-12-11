const express = require('express');
const bodyParser = require('body-parser');
const Path = require('path');

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
  //console.log('tweet_id', Path.parse(req.path).base);
  res.send();
});


app.post('/friends/:user_id', (req, res) => {
  //console.log('user_id', Path.parse(req.path).base);
  res.send();
});

app.listen(PORT, () => console.log(`Listening on port ${PORT}!`));

module.exports = app;
