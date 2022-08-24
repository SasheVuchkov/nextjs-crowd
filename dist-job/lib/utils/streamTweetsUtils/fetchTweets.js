"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fetchTweets = void 0;
const twitter_api_sdk_1 = require("twitter-api-sdk");
async function fetchTweets() {
    const client = new twitter_api_sdk_1.Client(process.env.TWITTER_BEARER_TOKEN);
    const tweetdata = await client.tweets.tweetsRecentSearch({
        "query": "next.js lang:en",
        "max_results": 10,
        "tweet.fields": [
            "created_at",
            "public_metrics",
            "entities"
        ],
        "expansions": [
            "author_id"
        ],
        "user.fields": [
            "created_at",
            "description",
            "profile_image_url",
            "public_metrics",
            "verified",
            "entities"
        ]
    });
    return tweetdata;
}
exports.fetchTweets = fetchTweets;
