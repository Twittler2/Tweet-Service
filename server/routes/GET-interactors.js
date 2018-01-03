const { getInteractors } = require('../../database/index.js');
const { get } = require('../routes/interactor-store.js');

function sendInteractors(tweetId, done) {
  getInteractors(tweetId)
    .then((result) => {
      done(null, result.rows[0].interactors + get(tweetId));
    })
    .catch((error) => {
      console.log('Ya done fucked up!');
      done(error);
    });
}

module.exports = { sendInteractors };
