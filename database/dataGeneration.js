
const uniqid = require('uniqid');
const randomIntArray = require('random-int-array');

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

function dataGeneration(client) {

  const options = {count: 10, min: 0, max: 10000000};
  const query = 'INSERT INTO tweets (id, content, isad, time, interactors) VALUES (?, ?, ?, ?, ?)';

  function Query(i) {
    const params = [uniqid(), `tweet ${i}`, (i%3 === 0) ? true : false, new Date(), randomIntArray(options)];
    client.execute(query, params, { prepare: true }, (err) => {
      if (err) {console.log(err)};
    });
  }

  function run1k(j) {
    console.log(j);
    for (let i = 0; i < 1000; i++) {
      Query(i);
    }
  };


  const iterations = 2;
    for (let i = 1; i < iterations; i++) {
      setTimeout(() => { run1k(i) }, 100*i);
      if (i === iterations-1) {
        setTimeout(() => {console.log('complete')}, 200*i);
      }
    }
};

module.exports = dataGeneration;