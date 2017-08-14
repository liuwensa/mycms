'use strict';

const redis     = require('ioredis');
const ratelimit = require('ratelimit.js');


// const ExpressMiddleware = ratelimit.ExpressMiddleware;
const RateLimit         = ratelimit.RateLimit;

const client = new redis(config.redis);


function limitEndpoint(req, res, next) {
  const uid = req.query.uid || 0;

  const limiter = new RateLimit(client, [{interval: 60, limit: 2}]);

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
//
// const limiter = new RateLimit(client, [{interval: 60, limit: 2}]);
//
// const limitMiddleware = new ExpressMiddleware(limiter, {
//   // defaults to false
//   ignoreRedisErrors: true
// });
//
// function getIdentifiers(req) {
//   return req.query.uid;
//   // return req.ips;
// }
//
// const expressLimitEndpoint = limitMiddleware.middleware({
//   getIdentifiers
// }, function (req, res, next) {
//   res.status(429).json({message: 'rate limit exceeded'});
// });


module.exports = {
  limitEndpoint,
  // expressLimitEndpoint
};
