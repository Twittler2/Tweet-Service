const axios = require('axios');
const { createNewTweet } = require('../../database/index.js');

function generateTweets(user, done) {
  console.log('User: ', user);

  axios.get(`http://127.0.0.1:3000/friends`)
    .then((result) => {
      const friends = result.data;
      createNewTweet(user)
        .then((result) => {
          console.log('tweet data: ', result);
          const id = result.id;
          const isAd = result.isAd;

          const payload = {
            tweet: { id, isAd },
            users: friends
          };

          // send payload to feed service

          done();
        }).catch((err) => {
          console.log(err);
          done();
        });
    }).catch((err) => {
      console.log(err);
      done();
    });
}

module.exports = { generateTweets };
