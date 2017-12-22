const cassandra = require('cassandra-driver');
const dataGeneration = require('./src/dataGeneration.js');
const { CASSANDRA_HOST, CASSANDRA_PORT } = require('../server/config.js');
const uniqid = require('uniqid');
const Promise = require('bluebird');
const casual = require('casual');

// Creaate a client to Cassandra database
const client = new cassandra.Client({ contactPoints: [`${CASSANDRA_HOST}`], keyspace: 'tweetkeyspace' });

const getInteractors = (id) => {
  const query = `SELECT interactors FROM tweets WHERE id='${id}'`;
  return client.execute(query);
};

const updateInteractors = (user, tweets) => {
  // Batch the updates?
  const queries = [];
  tweets.forEach((tweet) => {
    queries.push({ query: `UPDATE tweets SET interactors = interactors + [${user}] WHERE id='${tweet}'` });
  });
  return client.batch(queries, { prepare: true });
};

const createNewTweet = (user) => {
  const id = uniqid();
  const content = casual.sentence;
  const isAd = ((Math.floor(Math.random() * 100)) % 2 === 0);
  const time = new Date();
  const interactors = [user];
  const query = 'INSERT INTO tweets (id, content, isad, time, interactors) VALUES (?, ?, ?, ?, ?)';
  const params = [id, content, isAd, time, interactors];
  return new Promise((resolve, reject) => {
    client.execute(query, params, { prepare: true }, (err) => {
      if (err) {
        reject(err);
      } else {
        resolve({ id, isAd });
      }
    });
  });
};

const SEED = (err) => {
  if (!err) {
   // dataGeneration(client, 10000000);
  }
};

// Connect to Cassandra
client.connect((err) => {
  if (err) {
    console.log('Error: ', err);
  } else {
    console.log('Connected to cluster with %d host(s): %j', client.hosts.length, client.hosts.keys());
  }
  SEED(err);
});


module.exports = { getInteractors, updateInteractors, createNewTweet };
