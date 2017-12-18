require('elastic-apm-node').start({
  appName: 'tweetservice',
  secretToken: '',
  serverUrl: ''
});

const express = require('express');
const bodyParser = require('body-parser');
const Path = require('path');
const { getInteractors, updateInteractors } = require('../database/index.js');
// const { Kue, queue } = require('./queue/userKue.js');

const PORT = 3000;
const app = express();

// Kue dashboard
// app.use('/', Kue.app);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// app.use(function(req,res,next){setTimeout(next,5)});

app.post('/tweets/events', (req, res) => {

  // save user in kue to process later

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

  getInteractors(tweetId)
    .then((result) => {
      res.send(result.rows[0].interactors);
    })
    .catch((error) => {
      console.log('Ya done fucked up!');
      res.status(500).send(error);
      throw error;
    });
});


app.listen(PORT, () => console.log(`Listening on port ${PORT}!`));

module.exports = app;
