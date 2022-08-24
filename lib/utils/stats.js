"use strict";
exports.__esModule = true;
exports.calcBatchUserStats = exports.calcBatchTweetStats = void 0;
//Sashe Vuchkov: Mock up factory function that will create some stats in the future
var calcBatchTweetStats = function (tweets) { return ({
    total_tweets: 100,
    total_likes: 365,
    total_retweets: 101,
    total_replies: 150
}); };
exports.calcBatchTweetStats = calcBatchTweetStats;
//Sashe Vuchkov: Mock up factory function that will create some stats in the future
var calcBatchUserStats = function (users, tweetStats) {
    return {
        total_followers: 67368,
        total_engagement: 984,
        total_engagement_rate: '0.25',
        average_engagement_rate: '0.01'
    };
};
exports.calcBatchUserStats = calcBatchUserStats;
