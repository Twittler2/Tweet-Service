const Kue = require('kue');
const { generateTweets } = require('../src/generateTweets.js');
const { updateEvents } = require('../routes/POST-tweets-events.js');

const jobs = Kue.createQueue();

function createJob(type, payload, success, fail) {
  const job = jobs.create('job', {
    type,
    payload
  }).priority('high').attempts(5).save();

  job.on('complete', () => {
    success();
  });

  job.on('failed', () => {
    fail();
  });
}



jobs.process('job', 2, (job, done) => {
  if (job.data.type === 'Create Tweet') {
    generateTweets(job.data.payload.user, done);
  }

  if (job.data.type === 'Update Events') {
    updateEvents(job.data.payload.user, job.data.payload.tweets, done);
  }
});

module.exports = { createJob, Kue };
