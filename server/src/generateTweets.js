const axios = require('axios');

function generateTweets(user, done) {
  console.log('User: ', user);
  done();
}

module.exports = { generateTweets };
