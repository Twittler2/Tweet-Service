// REDIS STORE
// const Redis = require('ioredis');

// const interactorStore = new Redis(6378, '192.168.99.100');
let Store = {};

let count = 0;

function add(key, value) {
  console.log('Adding ', key, value);
  console.log('countL ', count);
  if (Store[key]) {
    Store[key].push(value);
  } else {
    Store[key] = [value];
    count++;
  }
}

function get(key) {
  if (!Store[key]) {
    return [];
  }
  return Store[key];
}

function getCount() {
  return count;
}

function getStore() {
  const store = JSON.parse(JSON.stringify(Store));
  Store = {};
  return store;
}

module.exports = { add, get, getCount, getStore };

// https://github.com/luin/ioredis/blob/master/API.md#new_Redis_new
