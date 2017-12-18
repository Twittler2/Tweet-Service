require('elastic-apm-node').start({
  appName: 'tweetservice',
  secretToken: '',
  serverUrl: ''
});

const express = require('express');
const bodyParser = require('body-parser');
const { addUserToQueue, kue } = require('./queue/userJobs.js');
const { sendInteractors } = require('./routes/GET-interactors.js');
const { updateEvents } = require('./routes/POST-tweets-events.js');

const PORT = 3000;
const app = express();

app.use('/', kue.app);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.post('/tweets/events', (req, res) => {
  addUserToQueue(req.query.user);
  updateEvents(req, res);
});

app.get('/interactors/:tweet_id', (req, res) => {
  sendInteractors(req, res);
});


app.listen(PORT, () => console.log(`Listening on port ${PORT}!`));

module.exports = app;
