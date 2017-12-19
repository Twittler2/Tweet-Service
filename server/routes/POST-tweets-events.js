const { updateInteractors } = require('../../database/index.js');

function updateEvents(req, res, done) {
  updateInteractors(req.query.user, JSON.parse(req.query.tweets))
    .then((result) => {
      console.log('updateEvents S');
      res.send(result);
      //done();
    })
    .catch((error) => {
      console.log('Ya done fucked up!');
      res.status(500).send(error);
      //done();
    });
}

module.exports = { updateEvents };
