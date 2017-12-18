const { updateInteractors } = require('../../database/index.js');

function updateEvents(req, res) {
  updateInteractors(req.query.user, JSON.parse(req.query.tweets))
    .then((result) => {
      res.send(result);
    })
    .catch((error) => {
      console.log('Ya done fucked up!');
      res.status(500).send(error);
    });
}

module.exports = { updateEvents };