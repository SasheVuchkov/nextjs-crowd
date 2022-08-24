"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EntityTweet = exports.EntityUser = void 0;
const redis_om_1 = require("redis-om");
class EntityUser extends redis_om_1.Entity {
}
exports.EntityUser = EntityUser;
class EntityTweet extends redis_om_1.Entity {
}
exports.EntityTweet = EntityTweet;
