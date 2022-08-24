"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getFormattedUserObject = exports.getFormattedTweetObject = void 0;
const calcScores_1 = require("./calcScores");
function getFormattedTweetObject(tweet) {
    let public_metric_arr = tweet["public_metrics"];
    let copy_tweet = JSON.parse(JSON.stringify(tweet));
    copy_tweet['entities'] = JSON.stringify(copy_tweet['entities']);
    copy_tweet['user'] = null;
    let tweet_score = (0, calcScores_1.calcTweetScore)(copy_tweet);
    copy_tweet['score'] = tweet_score;
    delete copy_tweet["public_metrics"];
    let merge_copy_tweets = Object.assign({}, public_metric_arr, copy_tweet);
    return merge_copy_tweets;
}
exports.getFormattedTweetObject = getFormattedTweetObject;
async function getFormattedUserObject(user) {
    let public_metric_arr = user["public_metrics"];
    let user_copy = JSON.parse(JSON.stringify(user));
    user_copy['entities'] = JSON.stringify(user_copy['entities']);
    user_copy['tweets'] = null;
    let user_score = await (0, calcScores_1.calcUserScore)(user_copy);
    user_copy['score'] = user_score;
    delete user_copy["public_metrics"];
    let merge_tweetusers = Object.assign({}, public_metric_arr, user_copy);
    return merge_tweetusers;
}
exports.getFormattedUserObject = getFormattedUserObject;
