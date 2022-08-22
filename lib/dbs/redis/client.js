"use strict";
exports.__esModule = true;
exports.RedisClient = void 0;
var redis_om_1 = require("redis-om");
var url = process.env.REDIS_URL;
var RedisClient = await new redis_om_1.Client().open(url);
exports.RedisClient = RedisClient;
