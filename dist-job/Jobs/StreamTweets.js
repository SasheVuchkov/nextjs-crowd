"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("../lib/dbs/redis/client");
const fetchTweets_1 = require("../lib/utils/streamTweetsUtils/fetchTweets");
const formatData_1 = require("../lib/utils/streamTweetsUtils/formatData");
const storeData_1 = require("../lib/utils/streamTweetsUtils/storeData");
async function main() {
    const tweetdata = await (0, fetchTweets_1.fetchTweets)();
    if (tweetdata['data']) {
        const tweets = tweetdata['data'];
        let users = tweetdata['includes']['users'];
        for (let x = 0; x < tweets.length; x++) {
            let tweet = tweets[x];
            let formattedtweet = (0, formatData_1.getFormattedTweetObject)(tweet);
            await (0, storeData_1.storeTweetInDB)(formattedtweet, tweet);
        }
        for (let y = 0; y < users.length; y++) {
            let user = users[y];
            let formatteduser = await (0, formatData_1.getFormattedUserObject)(user);
            await (0, storeData_1.storeUserInDB)(formatteduser, user);
        }
        const redisClient = await (0, client_1.getRedisClient)();
        await redisClient.close();
    }
}
main().catch(err => console.error(err.stack || err.message));
