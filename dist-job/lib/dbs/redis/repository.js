"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRepository = exports.TweetRepository = void 0;
const client_1 = require("./client");
const schema_1 = require("./schema");
const TweetRepository = async () => {
    const client = await (0, client_1.getRedisClient)();
    const repo = client.fetchRepository(schema_1.tweetSchema);
    await repo.createIndex();
    return repo;
};
exports.TweetRepository = TweetRepository;
const UserRepository = async () => {
    const client = await (0, client_1.getRedisClient)();
    const repo = client.fetchRepository(schema_1.userSchema);
    await repo.createIndex();
    return repo;
};
exports.UserRepository = UserRepository;
