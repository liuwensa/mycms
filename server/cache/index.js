'use strict';

const Redis = require('ioredis');

const redis = new Redis(config.redis);

redis.on('connect', () => {
  console.log('redis连接成功！');
});

redis.on('error', (err) => {
  console.log('redis连接失败！', err.message);
});


module.exports = {

};