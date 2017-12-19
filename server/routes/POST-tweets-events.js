const { updateInteractors } = require('../../database/index.js');

function updateEvents(user, tweets, done) {
  updateInteractors(user, JSON.parse(tweets))
    .then((result) => {
      done();
    })
    .catch((error) => {
      console.log('Ya done fucked up!');
      done();
    });
}

module.exports = { updateEvents };
