
const REDIS_HOST = process.env.REDIS_HOST || '18.220.220.60';
const REDIS_PORT = process.env.REDIS_PORT || 6379;
const USER_SERVICE = process.env.USER_SERVICE || 'http://18.218.1.47:3000/followers';
const FEED_SERVICE = process.env.FEED_SERVICE || 'http://192.168.99.100:8080/feed';
const CASSANDRA_HOST = process.env.CASSANDRA_HOST || '18.216.123.83';
const CASSANDRA_PORT = process.env.CASSANDRA_PORT || 9042;

module.exports = {
  REDIS_HOST,
  REDIS_PORT,
  USER_SERVICE,
  CASSANDRA_HOST,
  CASSANDRA_PORT,
  FEED_SERVICE
};


// http://18.218.1.47:3000/followers?user_id=1
//  18.217.144.243