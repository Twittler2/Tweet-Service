
const uniqid = require('uniqid');
const randomIntArray = require('random-int-array');
const Promise = require('bluebird');

// INSERT INTO tweets (id, content, isad, time, interactors)
// VALUES (now(), 'first tweet', false, toTimestamp(now()), [1, 2, 3, 4, 5]);


// TABLE SCHEMA
// CREATE TABLE tweets (
//   id text PRIMARY KEY,
//   content text,
//   isAd boolean,
//   time timestamp
//   interactors list<bigint>
// )

function dataGeneration(client, howMany) {
  console.log(' Starting ...');
  let jobs = [];

  function batch(count) {
    const options = {count: 10, min: 0, max: 10000000};
    let queries = [];

    if(count > howMany/50) {
      return;
    } else {

      const query = 'INSERT INTO tweets (id, content, isad, time, interactors) VALUES (?, ?, ?, ?, ?)';
      for(let i = 1; i < 50; i++) {
        const params = [uniqid(), `tweet ${i}`, (i%3 === 0) ? true : false, new Date(), randomIntArray(options)];
        queries.push({ query: query, params: params })
      }

      //jobs.push(new Promise((resolve, reject) => {
        client.batch(queries, { prepare: true }, (err) => {
          if (err) { console.log(err); };
          console.log(count*50);
          batch(count+1);
        });
      //}));

    }
  }

  batch(0);
  //Promise.all(jobs).then(() => { console.log('Complete!');}).catch((err) => {console.log(err);})
  
};

module.exports = dataGeneration;
