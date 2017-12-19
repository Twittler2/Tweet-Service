// require('elastic-apm-node').start({
//   appName: 'tweetservice',
//   secretToken: '',
//   serverUrl: ''
// });

const express = require('express');
const bodyParser = require('body-parser');
const { createJob, Kue } = require('./queue/Jobs.js');
const { sendInteractors } = require('./routes/GET-interactors.js');
// const { updateEvents } = require('./routes/POST-tweets-events.js');

const PORT = 3000;
const app = express();

app.use('/', Kue.app);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


app.post('/tweets/events', (req, res) => {
  // addJobToQueue({ user: req.query.user }, 'Create Tweet');
  // addJobToQueue({ req, res }, 'Update Events');

  // CREATE TWEET
  createJob('Create Tweet', { user: req.query.user }, () => {
    // success
    createJob('Update Events', { user: req.query.user, tweets: req.query.tweets }, (result) => {
      // success
      res.send();
    }, (err) => {
      // fail
      res.status(500).send();
      console.error(err);
    });
  }, (err) => {
    // fail
    res.status(500).send();
    console.error(err);
  });
});

app.get('/interactors/:tweet_id', (req, res) => {
  sendInteractors(req, res);
});


app.listen(PORT, () => console.log(`Listening on port ${PORT}!`));

module.exports = app;
