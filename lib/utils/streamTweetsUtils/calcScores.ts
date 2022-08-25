import {FormattedTweet, Tweet, User} from '../../types';


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
  
    return (followers_count / following_count) * (engagement * 50);
}
  