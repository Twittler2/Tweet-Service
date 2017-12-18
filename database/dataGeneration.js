// const uniqid = require('uniqid');
const randomIntArray = require('random-int-array');
const Promise = require('bluebird');

// TABLE SCHEMA
// CREATE TABLE tweets (
//   id text PRIMARY KEY,
//   content text,
//   isAd boolean,
//   time timestamp
//   interactors list<bigint>
// )

function dataGeneration(client, howMany) {
  console.log('Starting to insert', howMany);

  function batch(count, ID, callback) {
    const options = { count: 10, min: 0, max: 10000000 };
    const queries = [];

    if (count >= howMany / 50) {
      callback();
      return;
    } else {

      const query = 'INSERT INTO tweets (id, content, isad, time, interactors) VALUES (?, ?, ?, ?, ?)';
      let id;
      let content;
      let isAd;
      let date;
      let interactors;

      // Creates queries for batch insert into cassandra and elastic
      for (let i = 0; i < 50; i++) {
        id = ID++; // uniqid();
        content = `tweet ${i}`;
        isAd = (i % 3 === 0) ? true : false;
        date = new Date();
        interactors = randomIntArray(options);
        const params = [id, content, isAd, date, interactors];
        queries.push({ query, params });
      }

      // Batch insert into cassandra
      client.batch(queries, { prepare: true }, (err) => {
        console.log(' Inserted ', ++count * 50);
        batch(count, ID, callback);
      });

      // Promise.all(jobs)
      //   .then((res) => {
      //     console.log(' Inserted ', ++count * 50);
      //     batch(count, ID, callback);
      //   })
      //   .catch((err) => {
      //     console.log(err);
      //   });
    }
  }

  batch(0, 0, () => {
    console.log('Done...FUCK YEA NICK!!');
  });
};

module.exports = dataGeneration;
