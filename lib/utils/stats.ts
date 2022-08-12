import {Tweet, TweetStats, User as UserEntity, UserStats} from '../types';

//Sashe Vuchkov: Mock up factory function that will create some stats in the future
export const calcBatchTweetStats = (tweets: Tweet[]) => ({
    total_tweets: 100,
    total_likes: 365,
    total_retweets: 101,
    total_replies: 150
})

//Sashe Vuchkov: Mock up factory function that will create some stats in the future
export const calcBatchUserStats = (users: UserEntity[], tweetStats: TweetStats): UserStats => {
    return {
        total_users: 2009,
        total_followers: 67368,
        total_engagement: 984,
        total_engagement_rate: '0.25%',
    }
}