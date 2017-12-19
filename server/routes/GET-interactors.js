const { getInteractors } = require('../../database/index.js');

function sendInteractors(tweetId, done) {
  getInteractors(tweetId)
    .then((result) => {
      done(null, result.rows[0].interactors);
    })
    .catch((error) => {
      console.log('Ya done fucked up!');
      done(error);
    });
}

module.exports = { sendInteractors };
