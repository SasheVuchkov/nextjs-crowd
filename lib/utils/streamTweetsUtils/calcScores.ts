import {FormattedStats, FormattedTweet, FormattedUser, Tweet, User} from '../../types';
import {EntityStats, EntityUser} from '../../dbs/redis/entities';


function calcUserEngagement(tweets: FormattedTweet[]): number {
    let sum_of_tweet_scores = 0

    tweets.forEach(tweet => {
        sum_of_tweet_scores += tweet.score;
    })

    return sum_of_tweet_scores
}

export function calcTweetScore(tweet: Tweet): number {
    let {retweet_count, reply_count, like_count, quote_count}:
    {retweet_count: number, reply_count: number, like_count: number, quote_count: number} = tweet['public_metrics']
  
    let score = retweet_count + reply_count + like_count + quote_count

    return score
}
  
export function calcUserScore(user: User, tweets: FormattedTweet[]): number {
    let {followers_count, following_count, tweet_count, listed_count}:
    {followers_count: number, following_count: number, tweet_count: number, listed_count: number} = user['public_metrics']

    let engagement = calcUserEngagement(tweets)
  
    return Math.floor((followers_count - following_count) * (engagement * 30));
}

export function calcStats(tweets: FormattedTweet[], users: FormattedUser[], stats?: EntityStats): FormattedStats  {
    const {total_likes, total_retweets, total_replies, total_engagement} = tweets.reduce((prev, current) => {
        return {
            total_likes: prev.total_likes + current.like_count,
            total_replies: prev.total_replies + current.reply_count,
            total_retweets: prev.total_retweets + current.retweet_count + current.quote_count,
            total_engagement: prev.total_engagement + current.score,
        }
    }, {total_likes: 0, total_retweets: 0, total_replies: 0, total_engagement: 0})

    const total_followers = users.reduce((prev, current) => {
        return prev + current.followers_count;
    }, 0);

    const tweetStats = {
        total_tweets: tweets.length + (stats?.total_tweets || 0),
        total_likes: total_likes + (stats?.total_likes || 0),
        total_retweets: total_retweets + (stats?.total_retweets || 0),
        total_replies: total_replies + (stats?.total_replies || 0),
    };

    const totalEngagement = total_engagement + (stats?.total_engagement || 0);

    return {
        ...tweetStats,
        total_users: users.length,
        total_followers: total_followers,
        total_engagement: totalEngagement,
        total_engagement_rate: `${(totalEngagement * 100 / (total_followers || 1)).toFixed(2)}%`,
    }
}