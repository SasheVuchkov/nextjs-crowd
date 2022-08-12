import {StatsRegister} from './types';

//Sashe Vuchkov: Some initial stats to consider
export const statsRegister: StatsRegister = {
    total_followers: {
        name: 'Total Followers',
        description: 'The total number of people who follow the featured twitter users',
        icon: '',
    },

    total_engagement: {
        name: 'Engagements',
        description: 'The total number likes, replies and retweets of the collected tweets',
        icon: '',
    },

    total_engagement_rate: {
        name: 'Engagement Rate',
        description: 'The total engagement rate of all the collected tweets ',
        icon: '',
    },

    total_users: {
        name: 'Total Users',
        description: 'The total number of detected users who mention Next.js',
        icon: '',
    },

    total_tweets: {
        name: 'Collected Tweets',
        description: 'The total number of collected tweets today',
        icon: '',
    },
    total_likes: {
        name: 'Total Likes',
        description: 'The sum of all liked tweets today',
        icon: '',
    },

    total_retweets: {
        name: 'Total Retweets',
        description: 'The sum of all retweets and quotes today',
        icon: '',
    },
    total_replies: {
        name: 'Total Replies',
        description: 'The sum of all replies to the collected tweets today',
        icon: '',
    },
}