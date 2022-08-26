import {AboutStats, StatsRegister} from './types';

export const perPage = 30;
export const initCount = 15;

export const ssrCacheTtl = 5*60;
export const cacheControlValue =  `public, s-maxage=${ssrCacheTtl}, stale-while-revalidate=59`;

export const aboutStats: AboutStats = {
    developers_num: 2,
    tech_used: 8,
    invested_hours: 348,
    code_lines: 24482,
}

//Sashe Vuchkov: Some initial stats to consider
export const statsRegister: StatsRegister = {
    developers_num: {
        name: 'Developers',
        description: 'The total number of developers who worked on this app',
        icon: '',
    },

    code_lines: {
        name: 'Code Lines',
        description: 'Approximate number of code lines',
        icon: '',
    },

    invested_hours: {
        name: 'Invested Hours',
        description: 'The total number of invested hours from the project',
        icon: '',
    },

    tech_used: {
        name: 'Tech Used',
        description: 'Our stack: Redis, Next.Js, React.Js, HTML, CSS, TypeScript, JavaScript, Node.Js',
        icon: '',
    },

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