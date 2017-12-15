const cassandra = require('cassandra-driver');
const dataGeneration = require('./dataGeneration.js');
const elastic = require('./elasticsearch');

// const client = new cassandra.Client({ contactPoints: ['127.0.0.1'], keyspace: 'tweetkeyspace' });
const client = new cassandra.Client({ contactPoints: ['192.168.99.100:9042'], keyspace: 'tweetkeyspace' });

client.connect((err) => {
  if (err) {
    console.log('Error: ', err);
  } else {
    console.log('Connected to cluster with %d host(s): %j', client.hosts.length, client.hosts.keys());
  }

  elastic.indexExists().then((exists) => {
    if (exists) {
      console.log('Removing existing data from Elasticsearch ...');
      return elastic.deleteIndex().then().catch();
    }
  }).then(() => {
    console.log(' Sucessfully deleted with errors: ', err);
    console.log('Removing existing data from Cassandra ...');
    client.execute('TRUNCATE tweets', { prepare: true }, (delerr) => {
      console.log(' Sucessfully deleted with errors: ', delerr);
      dataGeneration(client, 6000, elastic);
    });
  }).catch((elaerr) => {
    console.log('You fucked up.. ', elaerr);
  });
});


module.exports = { client };


// IMPORTANT RUN CASANDRA IN CONTAINER AND CONNECT TO IT ON YOUR MACHINE
// docker run --name cassandra304 -d -p 9042:9042 cassandra:3.0.4  //EXPOSE PORTS
// IN ANOTHER TERMINAL    cqlsh 192.168.99.100   // IP is docker machine

// create keyspace <name> with replication = {'class':'SimpleStrategy','replication_factor':3};

// CREATE TABLE tweets (id text PRIMARY KEY, content text, isad boolean, time timestamp, interactors list<bigint>);

// IN SERVER
//   connect to 192.168.99.100:9042
