"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
var twitter_api_sdk_1 = require("twitter-api-sdk");
var repository_1 = require("../lib/dbs/redis/repository");
var dotenv_1 = require("dotenv");
(0, dotenv_1.config)();
if (process.env.BearerTOKEN) {
    var TOKEN = process.env.BearerTOKEN;
}
else {
    throw new Error("Twitter bearer token not defined as environment variable");
}
function main() {
    return __awaiter(this, void 0, void 0, function () {
        var TweetData;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, fetchTweets()];
                case 1:
                    TweetData = _a.sent();
                    console.log(TweetData);
                    return [2 /*return*/];
            }
        });
    });
}
function calcUserEngagement(Authorid) {
    return __awaiter(this, void 0, void 0, function () {
        var records, sum_of_tweet_scores, i, record, entityId, fetchrecord, score;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, repository_1.TweetRepository.search()
                        .where('author_id').equals(Authorid)["return"].all()];
                case 1:
                    records = _a.sent();
                    sum_of_tweet_scores = 0;
                    i = 0;
                    _a.label = 2;
                case 2:
                    if (!(i < records.length)) return [3 /*break*/, 5];
                    record = records[i];
                    entityId = record.entityId;
                    return [4 /*yield*/, repository_1.TweetRepository.fetch(entityId)];
                case 3:
                    fetchrecord = _a.sent();
                    score = fetchrecord.score;
                    sum_of_tweet_scores = sum_of_tweet_scores + score;
                    _a.label = 4;
                case 4:
                    i++;
                    return [3 /*break*/, 2];
                case 5: return [2 /*return*/, sum_of_tweet_scores];
            }
        });
    });
}
function calcTweetScore(tweet) {
    var _a = tweet['public_metrics'], retweet_count = _a.retweet_count, reply_count = _a.reply_count, like_count = _a.like_count, quote_count = _a.quote_count;
    var score = retweet_count + reply_count + like_count + quote_count;
    return score;
}
function calcUserScore(user) {
    return __awaiter(this, void 0, void 0, function () {
        var _a, followers_count, following_count, tweet_count, listed_count, Authorid, engagement, score;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _a = user['public_metrics'], followers_count = _a.followers_count, following_count = _a.following_count, tweet_count = _a.tweet_count, listed_count = _a.listed_count;
                    Authorid = user.id;
                    return [4 /*yield*/, calcUserEngagement(Authorid)];
                case 1:
                    engagement = _b.sent();
                    score = (followers_count / following_count) * (engagement * 50);
                    return [2 /*return*/, score];
            }
        });
    });
}
function getFormattedTweetObject(tweet) {
    var copy_tweet = JSON.parse(JSON.stringify(tweet));
    var tweet_score = calcTweetScore(copy_tweet);
    copy_tweet['score'] = tweet_score;
    delete copy_tweet["public_metrics"];
    return copy_tweet;
}
function getFormattedUserObject(user) {
    return __awaiter(this, void 0, void 0, function () {
        var tweetuser, user_score;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    tweetuser = JSON.parse(JSON.stringify(user));
                    return [4 /*yield*/, calcUserScore(tweetuser)];
                case 1:
                    user_score = _a.sent();
                    tweetuser['score'] = user_score;
                    delete tweetuser["public_metrics"];
                    return [2 /*return*/, tweetuser];
            }
        });
    });
}
function updateTweetRecord(id, tweet_from_raw_data) {
    return __awaiter(this, void 0, void 0, function () {
        var record, entityId_of_record, fetchRecordforUpdate;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, repository_1.TweetRepository.search()
                        .where('id').equals(id)["return"].all()];
                case 1:
                    record = _a.sent();
                    entityId_of_record = record[0].entityId;
                    return [4 /*yield*/, repository_1.TweetRepository.fetch(entityId_of_record)];
                case 2:
                    fetchRecordforUpdate = _a.sent();
                    fetchRecordforUpdate.score = calcTweetScore(tweet_from_raw_data);
                    return [4 /*yield*/, repository_1.TweetRepository.save(fetchRecordforUpdate)];
                case 3:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    });
}
function updateUserRecord(id, user_from_raw_data) {
    return __awaiter(this, void 0, void 0, function () {
        var record, entityId_of_record, fetchRecordforUpdate, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0: return [4 /*yield*/, repository_1.UserRepository.search()
                        .where('id').equals(id)["return"].all()];
                case 1:
                    record = _b.sent();
                    entityId_of_record = record[0].entityId;
                    return [4 /*yield*/, repository_1.UserRepository.fetch(entityId_of_record)];
                case 2:
                    fetchRecordforUpdate = _b.sent();
                    _a = fetchRecordforUpdate;
                    return [4 /*yield*/, calcUserScore(user_from_raw_data)];
                case 3:
                    _a.score = _b.sent();
                    return [4 /*yield*/, repository_1.UserRepository.save(fetchRecordforUpdate)];
                case 4:
                    _b.sent();
                    return [2 /*return*/];
            }
        });
    });
}
function tweetIdInDB(id) {
    return __awaiter(this, void 0, void 0, function () {
        var record;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, repository_1.TweetRepository.search()
                        .where('id').equals(id)["return"].all()];
                case 1:
                    record = _a.sent();
                    if (record.length != 0) {
                        return [2 /*return*/, true];
                    }
                    return [2 /*return*/, false];
            }
        });
    });
}
function userIdInDB(id) {
    return __awaiter(this, void 0, void 0, function () {
        var record;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, repository_1.UserRepository.search()
                        .where('id').equals(id)["return"].all()];
                case 1:
                    record = _a.sent();
                    if (record.length != 0) {
                        return [2 /*return*/, true];
                    }
                    return [2 /*return*/, false];
            }
        });
    });
}
function StoreTweetInDB(tweet, tweet_from_raw_data) {
    return __awaiter(this, void 0, void 0, function () {
        var TweetID, TweetIdInDB;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    TweetID = tweet['id'];
                    return [4 /*yield*/, tweetIdInDB(TweetID)];
                case 1:
                    TweetIdInDB = _a.sent();
                    if (!TweetIdInDB) return [3 /*break*/, 3];
                    return [4 /*yield*/, updateTweetRecord(TweetID, tweet_from_raw_data)];
                case 2:
                    _a.sent();
                    return [3 /*break*/, 4];
                case 3:
                    repository_1.TweetRepository.createAndSave(tweet);
                    _a.label = 4;
                case 4: return [2 /*return*/];
            }
        });
    });
}
function StoreUserInDB(user, user_from_raw_data) {
    return __awaiter(this, void 0, void 0, function () {
        var UserID, UserIdInDB;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    UserID = user['id'];
                    return [4 /*yield*/, userIdInDB(UserID)];
                case 1:
                    UserIdInDB = _a.sent();
                    if (!UserIdInDB) return [3 /*break*/, 3];
                    return [4 /*yield*/, updateUserRecord(UserID, user_from_raw_data)];
                case 2:
                    _a.sent();
                    return [3 /*break*/, 4];
                case 3:
                    repository_1.UserRepository.createAndSave(user);
                    _a.label = 4;
                case 4: return [2 /*return*/];
            }
        });
    });
}
function fetchTweets() {
    return __awaiter(this, void 0, void 0, function () {
        var client, tweetdata;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    client = new twitter_api_sdk_1.Client(TOKEN);
                    return [4 /*yield*/, client.tweets.tweetsRecentSearch({
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
                        })];
                case 1:
                    tweetdata = _a.sent();
                    return [2 /*return*/, tweetdata];
            }
        });
    });
}
main();
