const cassandra = require('cassandra-driver');
const Promise = require('bluebird');
const uniqid = require('uniqid');
const randomIntArray = require('random-int-array');


//const client = new cassandra.Client({ contactPoints: ['127.0.0.1'], keyspace: 'tweetkeyspace' });
const client = new cassandra.Client({ contactPoints: ['192.168.99.100:9042'], keyspace: 'tweetkeyspace' });

client.connect((err, result) => {
  console.log(err);
  console.log('Connected to cluster with %d host(s): %j', client.hosts.length, client.hosts.keys());
  
  const iterations = 200;
  for (let i = 1; i < iterations; i++) {
    setTimeout(() => { run10k(i) }, 5000*i);
    if (i === iterations-1) {
      setTimeout(() => {console.log('complete')}, 6000*i);
    }
  }
});


module.exports = client;

// INSERT INTO tweets (id, content, isad, time, interactors)
// VALUES (now(), 'first tweet', false, toTimestamp(now()), [1, 2, 3, 4, 5]);

const options = {count: 10, min: 0, max: 10000000};
const query = 'INSERT INTO tweets (id, content, isad, time, interactors) VALUES (?, ?, ?, ?, ?)';

function Query(i) {
  const params = [uniqid(), `tweet ${i}`, (i%3 === 0) ? true : false, new Date(), randomIntArray(options)];
  client.execute(query, params, { prepare: true }, (err) => {
    if (err) {console.log(err)};
  });
}

function run10k(j) {
  console.log(j);
  for (let i = 0; i < 10000; i++) {
    Query(i);
  }
};


// TABLE SCHEMA
// CREATE TABLE tweets (
//   id text PRIMARY KEY,
//   content text,
//   isAd boolean,
//   time timestamp
//   interactors list<bigint>
// )


// IMPORTANT RUN CASANDRA IN CONTAINER AND CONNECT TO IT ON YOUR MACHINE
// docker run --name cassandra304 -d -p 9042:9042 cassandra:3.0.4  //EXPOSE PORTS
// IN ANOTHER TERMINAL    cqlsh 192.168.99.100   // IP is docker machine
  
// create keyspace <name> with replication = {'class':'SimpleStrategy','replication_factor':3};

// CREATE TABLE tweets (id text PRIMARY KEY, content text, isad boolean, time timestamp, interactors list<bigint>);

// IN SERVER
//   connect to 192.168.99.100:9042
