const Kue = require('kue');
const { REDIS_HOST, REDIS_PORT } = require('../config.js');
const { generateTweets } = require('../src/generateTweets.js');
const { updateEvents } = require('../routes/POST-tweets-events.js');
const { sendInteractors } = require('../routes/GET-interactors.js');
const Promise = require('bluebird');

const jobs = Kue.createQueue({
  redis: {
    port: REDIS_PORT,
    host: REDIS_HOST
  }
});

function createJob(type, payload) {

  return new Promise((resolve, reject) => {
    const job = jobs.create('job', {
      type,
      payload
    }).priority('high').attempts(5).save();

    job.on('complete', (res) => {
      resolve(res);
    });

    job.on('failed', (err) => {
      reject(err);
    });
  });
}


jobs.process('job', 2, (job, done) => {
  if (job.data.type === 'Create Tweet') {
    generateTweets(job.data.payload.user, done);
  }

  if (job.data.type === 'Update Events') {
    updateEvents(job.data.payload.user, job.data.payload.tweets, done);
  }

  if (job.data.type === 'Get Interactors') {
    sendInteractors(job.data.payload.tweetId, done);
  }
});

module.exports = { createJob, Kue };
