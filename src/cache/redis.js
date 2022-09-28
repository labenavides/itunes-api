const redis = require('redis');
const config = require('../config/config');
const logger = require('../config/logger');

const redisClient = redis.createClient({
  host: config.redis.host,
  port: config.redis.port,
  password: config.redis.password,
});
redisClient
  .connect()
  .then(() => logger.info('connected'))
  .catch((err) => logger.error('connection error', err.stack));

redisClient.on('error', (err) => {
  logger.error(`Error ${err}`);
});

async function saveWithTtl(key, value, ttlSeconds) {
  return redisClient.setEx(key, ttlSeconds, JSON.stringify(value));
}

async function save(key, value) {
  return redisClient.set(key, JSON.stringify(value));
}

async function get(key) {
  const jsonString = await redisClient.get(key);

  if (jsonString) {
    return JSON.parse(jsonString);
  }
}

module.exports = {
  saveWithTtl,
  save,
  get,
};
