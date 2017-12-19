const Kue = require('kue');
const { generateTweets } = require('../src/generateTweets.js');
const { updateEvents } = require('../routes/POST-tweets-events.js');

const jobs = Kue.createQueue();

function addUserToQueue(user) {
  jobs.create('usersTweets', {
    user
  }).priority('high').attempts(5).save();
}

jobs.process('usersTweets', (job, done) => {
  generateTweets(job.data.user, done);
});

function addEventToQueue(req, res) {
  console.log('here');
  jobs.create('addEvent', {
    req,
    res
  }).priority('critical').attempts(5).save();
  console.log('there');
}

jobs.process('addEvent', (job, done) => {
  updateEvents(job.data.req, job.data.res, done);
  //done();
});

module.exports = { addUserToQueue, addEventToQueue, Kue };