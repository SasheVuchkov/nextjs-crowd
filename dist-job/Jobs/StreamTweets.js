"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const twitter_api_sdk_1 = require("twitter-api-sdk");
const repository_1 = require("../lib/dbs/redis/repository");
const dotenv_1 = require("dotenv");
(0, dotenv_1.config)({ path: './.env.local' });
if (process.env.BearerTOKEN) {
    var TOKEN = process.env.BearerTOKEN;
}
else {
    throw new Error("Twitter bearer token not defined as environment variable");
}
async function main() {
    const TweetData = await fetchTweets();
    console.log(TweetData);
    /*
  if (TweetData['data']){

  const tweets: Tweet[] = TweetData['data']

  let users: User[] = TweetData['includes']['users']


  for(let x: number=0;x<tweets.length;x++){

      let tweet: Tweet=tweets[x]

      var formattedtweet: FormattedTweet=getFormattedTweetObject(tweet)

      await StoreTweetInDB (formattedtweet, tweet)

 
    }
  
    for(let y=0;y<users.length;y++){


      let user: User=users[y]


      let formatteduser: FormattedUser=await getFormattedUserObject(user)

      await StoreUserInDB (formatteduser, user)

      
    }
    
    const redisClient = await getRedisClient();
    await redisClient.close();
  }

     */
}
async function calcUserEngagement(Authorid) {
    const repo = await (0, repository_1.TweetRepository)();
    var records = await repo.search()
        .where('author_id').equals(Authorid).return.all();
    var sum_of_tweet_scores = 0;
    for (let i = 0; i < records.length; i++) {
        var record = records[i];
        var entityId = record.entityId;
        var fetchrecord = await repo.fetch(entityId);
        var score = fetchrecord.score;
        sum_of_tweet_scores = sum_of_tweet_scores + score;
    }
    return sum_of_tweet_scores;
}
function calcTweetScore(tweet) {
    var { retweet_count, reply_count, like_count, quote_count } = tweet['public_metrics'];
    var score = retweet_count + reply_count + like_count + quote_count;
    return score;
}
async function calcUserScore(user) {
    var { followers_count, following_count, tweet_count, listed_count } = user['public_metrics'];
    var Authorid = user.id;
    var engagement = await calcUserEngagement(Authorid);
    var score = (followers_count / following_count) * (engagement * 50);
    return score;
}
function getFormattedTweetObject(tweet) {
    let copy_tweet = JSON.parse(JSON.stringify(tweet));
    var tweet_score = calcTweetScore(copy_tweet);
    copy_tweet['score'] = tweet_score;
    delete copy_tweet["public_metrics"];
    return copy_tweet;
}
async function getFormattedUserObject(user) {
    let tweetuser = JSON.parse(JSON.stringify(user));
    let user_score = await calcUserScore(tweetuser);
    tweetuser['score'] = user_score;
    delete tweetuser["public_metrics"];
    return tweetuser;
}
async function updateTweetRecord(id, tweet_from_raw_data) {
    const repo = await (0, repository_1.TweetRepository)();
    var record = await repo.search()
        .where('id').equals(id).return.all();
    var entityId_of_record = record[0].entityId;
    var fetchRecordforUpdate = await repo.fetch(entityId_of_record);
    fetchRecordforUpdate.score = calcTweetScore(tweet_from_raw_data);
    await repo.save(fetchRecordforUpdate);
}
async function updateUserRecord(id, user_from_raw_data) {
    const repo = await (0, repository_1.UserRepository)();
    var record = await repo.search()
        .where('id').equals(id).return.all();
    var entityId_of_record = record[0].entityId;
    var fetchRecordforUpdate = await repo.fetch(entityId_of_record);
    fetchRecordforUpdate.score = await calcUserScore(user_from_raw_data);
    await repo.save(fetchRecordforUpdate);
}
async function tweetIdInDB(id) {
    const repo = await (0, repository_1.TweetRepository)();
    const record = await repo.search()
        .where('id').equals(id).return.all();
    return record.length != 0;
}
async function userIdInDB(id) {
    const repo = await (0, repository_1.UserRepository)();
    var record = await repo.search()
        .where('id').equals(id).return.all();
    if (record.length != 0) {
        return true;
    }
    return false;
}
async function StoreTweetInDB(tweet, tweet_from_raw_data) {
    var TweetID = tweet['id'];
    var TweetIdInDB = await tweetIdInDB(TweetID);
    if (TweetIdInDB) {
        await updateTweetRecord(TweetID, tweet_from_raw_data);
    }
    else {
        const repo = await (0, repository_1.TweetRepository)();
        await repo.createAndSave(tweet);
    }
}
async function StoreUserInDB(user, user_from_raw_data) {
    var UserID = user['id'];
    var UserIdInDB = await userIdInDB(UserID);
    if (UserIdInDB) {
        await updateUserRecord(UserID, user_from_raw_data);
    }
    else {
        const repo = await (0, repository_1.UserRepository)();
        await repo.createAndSave(user);
    }
}
async function fetchTweets() {
    const client = new twitter_api_sdk_1.Client(TOKEN);
    const tweetdata = await client.tweets.tweetsRecentSearch({
        "query": "next.js lang:en",
        "max_results": 10,
        "tweet.fields": [
            "created_at",
            "public_metrics"
        ],
        "expansions": [
            "author_id"
        ],
        "user.fields": [
            "created_at",
            "description",
            "profile_image_url",
            "public_metrics",
            "verified"
        ]
    });
    return tweetdata;
}
main().catch(err => console.error(err.stack || err.message));
