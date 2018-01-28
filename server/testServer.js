const express = require('express');
const bodyParser = require('body-parser');
const randomIntArray = require('random-int-array');
// const axios = require('axios');

const PORT = 8080;
const app = express();
const options = { count: 10, min: 0, max: 10000000 };

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


app.get('/friends', (req, res) => {
  res.send(randomIntArray(options));
});

app.post('/feed', (req, res) => {
  console.log('Recieved: ', req.body);
  res.send();
});

app.listen(PORT, () => console.log(`Listening on port ${PORT}!`));

// for (var i = 0; i < 100; i++) {
//   axios.post('http://localhost:3000/tweets/events', {
//     user: Math.floor(Math.random() * 100),
//     tweets: ['z2uws98sjbcw8br5', 'z2uws98sjbcw8bfg', 'z2uws98sjbcw841i']
//   }).then((res) => {

//   }).catch((err) => {

//   });
// }
