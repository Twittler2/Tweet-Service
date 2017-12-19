const axios = require('axios');
const { USER_SERVICE, FEED_SERVICE } = require('../config.js');
const { createNewTweet } = require('../../database/index.js');

function generateTweets(user, done) {
  axios.get(USER_SERVICE)
    .then((result) => {
      const friends = result.data;
      createNewTweet(user)
        .then((result) => {
          const id = result.id;
          const isAd = result.isAd;

          const payload = {
            tweet: { id, isAd },
            users: friends
          };

          axios.post(FEED_SERVICE, payload)
            .then(() => {
              done();
            }).catch((err) => {
              console.log(err);
              done();
            });

        }).catch((err) => {
          done();
          console.error(err);
        });
    }).catch((err) => {
      done();
      console.error(err);
    });
}

module.exports = { generateTweets };
