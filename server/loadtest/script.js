const axios = require('axios');

for(var i = 0; i < 500; i++) {
  console.log(i);
  axios.post('http://127.0.0.1:3000/tweets/events', {
    tweets: ["z2uwsbu8jbcv1cdh", "z2uwsbu8jbcu2sf6"],
    user: 1
  }); 
}