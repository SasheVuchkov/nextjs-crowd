"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.calcUserScore = exports.calcTweetScore = void 0;
const repository_1 = require("../../dbs/redis/repository");
async function calcUserEngagement(Authorid) {
    const repo = await (0, repository_1.TweetRepository)();
    let records = await repo.search()
        .where('author_id').equals(Authorid).return.all();
    let sum_of_tweet_scores = 0;
    for (let i = 0; i < records.length; i++) {
        let record = records[i];
        let entityId = record.entityId;
        let fetchrecord = await repo.fetch(entityId);
        let score = fetchrecord.score;
        sum_of_tweet_scores = sum_of_tweet_scores + score;
    }
    return sum_of_tweet_scores;
}
function calcTweetScore(tweet) {
    let { retweet_count, reply_count, like_count, quote_count } = tweet['public_metrics'];
    let score = retweet_count + reply_count + like_count + quote_count;
    return score;
}
exports.calcTweetScore = calcTweetScore;
async function calcUserScore(user) {
    let { followers_count, following_count, tweet_count, listed_count } = user['public_metrics'];
    let authorid = user.id;
    let engagement = await calcUserEngagement(authorid);
    let score = (followers_count / following_count) * (engagement * 50);
    return score;
}
exports.calcUserScore = calcUserScore;
