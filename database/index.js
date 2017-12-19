const cassandra = require('cassandra-driver');
const dataGeneration = require('./src/dataGeneration.js');
const uniqid = require('uniqid');
const Promise = require('bluebird');
const casual = require('casual');

// Creaate a client to Cassandra database
// const client = new cassandra.Client({ contactPoints: ['127.0.0.1'], keyspace: 'tweetkeyspace' });
const client = new cassandra.Client({ contactPoints: ['192.168.99.100:9042'], keyspace: 'tweetkeyspace' });

const getInteractors = (id) => {
  const query = `SELECT interactors FROM tweets WHERE id='${id}'`;
  return client.execute(query);
};

const updateInteractors = (user, tweets) => {
  const queries = [];
  tweets.forEach((tweet) => {
    queries.push({ query: `UPDATE tweets SET interactors = interactors + [${user}] WHERE id='${tweet}'` });
  });
  return client.batch(queries, { prepare: true });
};

const createNewTweet = (user) => {
  // id, content, isad, time, interactors
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
  // SEED(err);
});


module.exports = { getInteractors, updateInteractors, createNewTweet };


// IMPORTANT RUN CASANDRA IN CONTAINER AND CONNECT TO IT ON YOUR MACHINE
// docker run --name cassandra304 -d -p 9042:9042 cassandra:3.0.4  //EXPOSE PORTS
// IN ANOTHER TERMINAL    cqlsh 192.168.99.100   // IP is docker machine

// create keyspace <name> with replication = {'class':'SimpleStrategy','replication_factor':3};

// CREATE TABLE tweets (id text PRIMARY KEY, content text, isad boolean, time timestamp, interactors list<bigint>);

// IN SERVER
//   connect to 192.168.99.100:9042
