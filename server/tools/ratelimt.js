'use strict';

const redis     = require('ioredis');
const ratelimit = require('ratelimit.js');


const ExpressMiddleware = ratelimit.ExpressMiddleware;
const RateLimit         = ratelimit.RateLimit;

const client = new redis(config.redis);

const limiter = new RateLimit(client, [{interval: 1, limit: 2}]);

const limitMiddleware = new ExpressMiddleware(limiter, {
  // defaults to false
  ignoreRedisErrors: true
});


function limitEndpoint(req, res, next) {
  const uid = req.query.uid || 0;

  limiter.incr(uid, function (err, isRateLimited) {
    if (err) {
      res.status(429).json({message: err.message});
    } else if (isRateLimited) {
      res.status(429).json({message: isRateLimited});
    } else {
      return next();
    }
  });
}

// function getIdentifiers(req) {
//   // return req.query.uid;
//   return req.ips;
// }
//
// function weight(req) {
//   return Math.round(Math.random() * 100);
// }
//
// const options = {
//   getIdentifiers: getIdentifiers,
//   weight        : weight
// };
//
//
// const limitEndpoint = limitMiddleware.middleware(options, function(req, res, next) {
//   // console.log(req, '==========\n', res)
//   // console.log(req.ips)
//   res.status(429).json({message: 'rate limit exceeded'});
// });

module.exports = {
  limitEndpoint
};
