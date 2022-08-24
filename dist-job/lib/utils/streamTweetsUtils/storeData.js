"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.storeUserInDB = exports.storeTweetInDB = void 0;
const repository_1 = require("../../dbs/redis/repository");
const updateRecord_1 = require("./updateRecord");
async function tweetIdInDB(id) {
    const repo = await (0, repository_1.TweetRepository)();
    const record = await repo.search()
        .where('id').equals(id).return.all();
    return record.length != 0;
}
async function userIdInDB(id) {
    const repo = await (0, repository_1.UserRepository)();
    let record = await repo.search()
        .where('id').equals(id).return.all();
    if (record.length != 0) {
        return true;
    }
    return false;
}
async function storeTweetInDB(tweet, tweet_from_raw_data) {
    let TweetID = tweet['id'];
    let TweetIdInDB = await tweetIdInDB(TweetID);
    if (TweetIdInDB) {
        await (0, updateRecord_1.updateTweetRecord)(TweetID, tweet_from_raw_data);
    }
    else {
        const repo = await (0, repository_1.TweetRepository)();
        await repo.createAndSave(tweet);
    }
}
exports.storeTweetInDB = storeTweetInDB;
async function storeUserInDB(user, user_from_raw_data) {
    let UserID = user['id'];
    let UserIdInDB = await userIdInDB(UserID);
    if (UserIdInDB) {
        await (0, updateRecord_1.updateUserRecord)(UserID, user_from_raw_data);
    }
    else {
        const repo = await (0, repository_1.UserRepository)();
        await repo.createAndSave(user);
    }
}
exports.storeUserInDB = storeUserInDB;
