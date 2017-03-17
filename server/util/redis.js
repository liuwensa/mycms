
'use strict';

const redis = require('redis');

const client = redis.createClient(config.redis.port, config.redis.host);
client.auth(config.redis.psd);

module.exports = client;
