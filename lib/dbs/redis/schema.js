"use strict";
exports.__esModule = true;
exports.userSchema = exports.tweetSchema = void 0;
var redis_om_1 = require("redis-om");
var entities_1 = require("./entities");
exports.tweetSchema = new redis_om_1.Schema(entities_1.EntityTweet, {
    id: { type: 'string' },
    text: { type: 'string' },
    author_id: { type: 'string' },
    created_at: { type: 'string' },
    score: { type: 'number' },
    retweet_count: { type: 'number' },
    reply_count: { type: 'number' },
    like_count: { type: 'number' },
    quote_count: { type: 'number' },
    entities: { type: 'string' }
});
exports.userSchema = new redis_om_1.Schema(entities_1.EntityUser, {
    id: { type: 'string' },
    name: { type: 'string' },
    username: { type: 'string' },
    url: { type: 'string' },
    profile_image_url: { type: 'string' },
    description: { type: 'string' },
    created_at: { type: 'string' },
    verified: { type: 'boolean' },
    score: { type: 'number' },
    followers_count: { type: 'number' },
    following_count: { type: 'number' },
    tweet_count: { type: 'number' },
    listed_count: { type: 'number' },
    entities: { type: 'string' }
});
