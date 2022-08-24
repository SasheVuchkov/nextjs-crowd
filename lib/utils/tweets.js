"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
exports.__esModule = true;
exports.assignUsersToTweets = exports.getTweetUrl = void 0;
//Sashe Vuchkov: Let's put the url generation in a factory function so if it changes we must edit it in one place
var getTweetUrl = function (tweet) { var _a; return "https://twitter.com/".concat((_a = tweet.user) === null || _a === void 0 ? void 0 : _a.username, "/status/").concat(tweet.id); };
exports.getTweetUrl = getTweetUrl;
var assignUsersToTweets = function (tweets, users) { return tweets.map(function (tweet) { return (__assign(__assign({}, tweet), { user: (__spreadArray([], users, true).filter(function (user) { return user.id === tweet.author_id; }).pop()) })); }); };
exports.assignUsersToTweets = assignUsersToTweets;
