import {Tweet, TweetStats, User as UserEntity, UserStats} from '../types';

export const calcBatchTweetStats = (tweets: Tweet[]) => ({
    total_tweets: tweets.length,
    total_likes: tweets.reduce((previous, current) => previous + current.public_metrics.like_count, 0),
    total_retweets: tweets.reduce((previous, current) => previous + current.public_metrics.retweet_count + current.public_metrics.quote_count, 0),
    total_replies: tweets.reduce((previous, current) => previous + current.public_metrics.reply_count, 0),
})

export const calcBatchUserStats = (users: UserEntity[], tweetStats: TweetStats): UserStats => {
    const totalFollowers = users.reduce((previous, current) => previous + current.public_metrics.followers_count, 0);
    const totalEngagement = Object.values(tweetStats).reduce((previous, current) => previous + current, 0);
    const totalEngagementRate = totalEngagement/totalFollowers;

    return {
        total_followers: totalFollowers,
        total_engagement: totalEngagement,
        total_engagement_rate: totalEngagementRate.toFixed(2),
        average_engagement_rate: (totalEngagementRate/users.length).toFixed(2),

    }
}