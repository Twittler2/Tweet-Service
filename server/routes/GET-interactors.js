const { getInteractors } = require('../../database/index.js');
const Path = require('path');

function sendInteractors(req, res) {
  const tweetId = Path.parse(req.path).base;
  getInteractors(tweetId)
    .then((result) => {
      res.send(result.rows[0].interactors);
    })
    .catch((error) => {
      console.log('Ya done fucked up!');
      res.status(500).send(error);
      throw error;
    });
}

module.exports = { sendInteractors };
