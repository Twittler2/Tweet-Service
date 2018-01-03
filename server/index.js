// require('elastic-apm-node').start({
//   appName: 'tweetservice',
//   secretToken: '',
//   serverUrl: ''
// });
const cluster = require('cluster');

if (cluster.isMaster) {
  console.log(`Master ${process.pid} is running`);

  // Fork workers.
  for (let i = 0; i < 4; i++) {
    cluster.fork();
    console.log('number of cpus :', i);
  }

  cluster.on('exit', (worker, code, signal) => {
    console.log(`worker ${worker.process.pid} died`);
  });
} else {
  const express = require('express');
  const bodyParser = require('body-parser');
  const Path = require('path');
  const { createJob, Kue } = require('./queue/Jobs.js');

  const PORT = 3000;
  const app = express();

  app.use('/', Kue.app);
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));

  app.get('/working', (req, res) => {
    res.send('It is up');
  });

  app.post('/tweets/events', (req, res) => {
    createJob('Create Tweet', { user: req.body.user })
      .then((result) => {
        createJob('Update Events', { user: req.body.user, tweets: req.body.tweets })
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


  app.listen(PORT, () => console.log(`Listening on port ${PORT} @ ${new Date()}!`));

  module.exports = app;
}

