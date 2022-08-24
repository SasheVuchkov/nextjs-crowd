"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateUserRecord = exports.updateTweetRecord = void 0;
const repository_1 = require("../../dbs/redis/repository");
const calcScores_1 = require("./calcScores");
async function updateTweetRecord(id, tweet_from_raw_data) {
    const repo = await (0, repository_1.TweetRepository)();
    let record = await repo.search()
        .where('id').equals(id).return.all();
    let { retweet_count, reply_count, like_count, quote_count } = tweet_from_raw_data['public_metrics'];
    let entityId_of_record = record[0].entityId;
    let fetchRecordforUpdate = await repo.fetch(entityId_of_record);
    fetchRecordforUpdate.score = (0, calcScores_1.calcTweetScore)(tweet_from_raw_data);
    fetchRecordforUpdate.retweet_count = retweet_count;
    fetchRecordforUpdate.reply_count = reply_count;
    fetchRecordforUpdate.like_count = like_count;
    fetchRecordforUpdate.quote_count = quote_count;
    await repo.save(fetchRecordforUpdate);
}
exports.updateTweetRecord = updateTweetRecord;
async function updateUserRecord(id, user_from_raw_data) {
    const repo = await (0, repository_1.UserRepository)();
    let record = await repo.search()
        .where('id').equals(id).return.all();
    let entityId_of_record = record[0].entityId;
    let { followers_count, following_count, tweet_count, listed_count } = user_from_raw_data['public_metrics'];
    let fetchRecordforUpdate = await repo.fetch(entityId_of_record);
    fetchRecordforUpdate.score = await (0, calcScores_1.calcUserScore)(user_from_raw_data);
    fetchRecordforUpdate.followers_count = followers_count;
    fetchRecordforUpdate.following_count = following_count;
    fetchRecordforUpdate.tweet_count = tweet_count;
    fetchRecordforUpdate.listed_count = listed_count;
    await repo.save(fetchRecordforUpdate);
}
exports.updateUserRecord = updateUserRecord;
