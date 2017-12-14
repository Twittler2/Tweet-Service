const cassandra = require('cassandra-driver');
const dataGeneration = require('./dataGeneration.js');

//const client = new cassandra.Client({ contactPoints: ['127.0.0.1'], keyspace: 'tweetkeyspace' });
const client = new cassandra.Client({ contactPoints: ['192.168.99.100:9042'], keyspace: 'tweetkeyspace' });

client.connect((err, result) => {
  console.log(err);
  console.log('Connected to cluster with %d host(s): %j', client.hosts.length, client.hosts.keys());
  
  dataGeneration(client, 10000000);

});

module.exports = client;


// IMPORTANT RUN CASANDRA IN CONTAINER AND CONNECT TO IT ON YOUR MACHINE
// docker run --name cassandra304 -d -p 9042:9042 cassandra:3.0.4  //EXPOSE PORTS
// IN ANOTHER TERMINAL    cqlsh 192.168.99.100   // IP is docker machine
  
// create keyspace <name> with replication = {'class':'SimpleStrategy','replication_factor':3};

// CREATE TABLE tweets (id text PRIMARY KEY, content text, isad boolean, time timestamp, interactors list<bigint>);

// IN SERVER
//   connect to 192.168.99.100:9042
