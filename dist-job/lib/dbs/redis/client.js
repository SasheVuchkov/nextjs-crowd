"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getRedisClient = void 0;
const redis_om_1 = require("redis-om");
const dotenv_1 = require("dotenv");
(0, dotenv_1.config)({ path: './.env.local' });
const url = process.env.REDIS_URL;
let redisClient;
const getRedisClient = async () => {
    if (!redisClient) {
        redisClient = new redis_om_1.Client();
    }
    if (!redisClient.isOpen()) {
        await redisClient.open(url);
    }
    return redisClient;
};
exports.getRedisClient = getRedisClient;
