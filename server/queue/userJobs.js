const kue = require('kue');
const { generateTweets } = require('../src/generateTweets.js');

const jobs = kue.createQueue();

function addUserToQueue(user) {
  jobs.create('usersTweets', {
    user
  }).priority('high').attempts(5).save();
}

jobs.process('usersTweets', (job, done) => {
  generateTweets(job.data.user, done);
});


module.exports = { addUserToQueue, kue };