// Add this to the VERY top of the first file loaded in your app
const apm = require('elastic-apm-node').start({
  // Set required app name (allowed characters: a-z, A-Z, 0-9, -, _, and space)
  appName: 'tweetservice',
  // Use if APM Server requires a token
  secretToken: '',
  // Set custom APM Server URL (default: http://localhost:8200)
  serverUrl: ''
});

const express = require('express');
const bodyParser = require('body-parser');
const Path = require('path');
const { getInteractors, updateInteractors } = require('../database/index.js');
// const axios = require('axios');
// const elastic = require('../database/elasticsearch');

const PORT = 3000;
const app = express();

let cache = {};
let count = 0;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.post('/tweets/events', (req, res) => {
  updateInteractors(req.query.user, JSON.parse(req.query.tweets))
    .then((result) => {
      res.send(result);
    })
    .catch((error) => {
      console.log('Ya done fucked up!');
      res.status(500).send(error);
    });
});

app.get('/interactors/:tweet_id', (req, res) => {
  const tweetId = Path.parse(req.path).base;

  if (cache[tweetId]) {
    res.send(cache[tweetId]);
  } else {
    getInteractors(tweetId)
      .then((result) => {
        cache[tweetId] = result.rows[0].interactors;
        count++;
        res.send(result.rows[0].interactors);
      })
      .catch((error) => {
        console.log('Ya done fucked up!');
        res.status(500).send(error);
        throw error;
      });
  }

  if (count > 1300) {
    cache = {};
    count = 0;
  }

});


app.listen(PORT, () => console.log(`Listening on port ${PORT}!`));

module.exports = app;
