const axios = require('axios');
const { createNewTweet } = require('../../database/index.js');

function generateTweets(user, done) {
  axios.get(`http://127.0.0.1:8080/friends`)
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

          // send payload to feed service
          console.log("FEED PAYLOAD: ", payload);

          done();
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
