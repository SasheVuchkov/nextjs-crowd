"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userSchema = exports.tweetSchema = void 0;
const redis_om_1 = require("redis-om");
const entities_1 = require("./entities");
exports.tweetSchema = new redis_om_1.Schema(entities_1.EntityTweet, {
    id: { type: 'string' },
    text: { type: 'string' },
    author_id: { type: 'string' },
    created_at: { type: 'string' },
    score: { type: 'number' }
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
    score: { type: 'number' }
});
