"use strict";
exports.__esModule = true;
exports.statsRegister = void 0;
//Sashe Vuchkov: Some initial stats to consider
exports.statsRegister = {
    total_followers: {
        name: 'Total Followers',
        description: 'The total number of people who follow the featured twitter users',
        icon: ''
    },
    total_engagement: {
        name: 'Total Engagement',
        description: 'The total number likes, replies and retweets of the collected tweets',
        icon: ''
    },
    total_engagement_rate: {
        name: 'Total Engagement Rate',
        description: 'The total engagement rate of all the collected tweets ',
        icon: ''
    },
    average_engagement_rate: {
        name: 'Avg. Engagement Rate',
        description: 'The average engagement rate per featured author',
        icon: ''
    }, total_tweets: {
        name: 'Collected Tweets',
        description: 'The total number of collected tweets today',
        icon: ''
    },
    total_likes: {
        name: 'Total Likes',
        description: 'The sum of all liked tweets today',
        icon: ''
    },
    total_retweets: {
        name: 'Total Retweets',
        description: 'The sum of all retweets and quotes today',
        icon: ''
    },
    total_replies: {
        name: 'Total Replies',
        description: 'The sum of all replies to the collected tweets today',
        icon: ''
    }
};
