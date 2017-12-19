// require('elastic-apm-node').start({
//   appName: 'tweetservice',
//   secretToken: '',
//   serverUrl: ''
// });

const express = require('express');
const bodyParser = require('body-parser');
const Path = require('path');
const { createJob, Kue } = require('./queue/Jobs.js');

const PORT = 3000;
const app = express();

app.use('/', Kue.app);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


app.post('/tweets/events', (req, res) => {
  createJob('Create Tweet', { user: req.query.user })
    .then((result) => {
      createJob('Update Events', { user: req.query.user, tweets: req.query.tweets })
        .then(() => {
          res.send();
        }).catch((err) => {
          res.status(500).send();
          console.error(err);
        });
    }).catch((err) => {
      res.status(500).send();
      console.error(err);
    });
});

app.get('/interactors/:tweet_id', (req, res) => {
  createJob('Get Interactors', { tweetId: Path.parse(req.path).base })
    .then((result) => {
      res.send(result);
    }).catch((err) => {
      console.error(err);
      res.status(500).send();
    });
});


app.listen(PORT, () => console.log(`Listening on port ${PORT}!`));

module.exports = app;
