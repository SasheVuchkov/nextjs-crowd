import * as cloneDeep from 'lodash.clonedeep';
import { Tweet, FormattedTweet, User, FormattedUser } from "../../types"
import { calcTweetScore, calcUserScore } from "./calcScores"

export function getFormattedTweetObject(tweet: Tweet): FormattedTweet {

    let public_metric_arr = tweet["public_metrics"];
  
    let copy_tweet: Tweet = cloneDeep(tweet);
  
    copy_tweet['entities'] = JSON.stringify(copy_tweet['entities']);
  
    copy_tweet['user'] =  null;
    copy_tweet['score'] = calcTweetScore(copy_tweet);
    copy_tweet['created_at_date'] = new Date(copy_tweet['created_at']);
  
    delete copy_tweet["public_metrics"];
  
    let merge_copy_tweets = Object.assign({}, public_metric_arr, copy_tweet);
  
  
    return merge_copy_tweets as unknown as FormattedTweet;
  
  
  } 
  
export async function getFormattedUserObject(user: User, tweets: FormattedTweet[]): Promise<FormattedUser>{
  
  let public_metric_arr = user["public_metrics"]
  
  let user_copy: User = JSON.parse(JSON.stringify(user))
  
  user_copy['entities'] = JSON.stringify(user_copy['entities'])
  
  user_copy['tweets'] =  null
  user_copy['score'] = calcUserScore(user, tweets)
  user_copy['saved_at_date'] = new Date()

  let counts = tweets.reduce((prev, current) => {
      return {
          retweet_count: prev.retweet_count + current.retweet_count,
          reply_count: prev.reply_count + current.reply_count,
          like_count: prev.like_count + current.like_count,
          quote_count: prev.quote_count + current.quote_count
      };
  }, {retweet_count: 0, reply_count: 0, like_count: 0, quote_count: 0})

  user_copy['retweet_count'] = counts.retweet_count;
  user_copy['reply_count'] = counts.reply_count;
  user_copy['like_count'] = counts.like_count;
  user_copy['quote_count'] = counts.quote_count;

  delete user_copy["public_metrics"]
  
  let merge_tweetusers = Object.assign({}, public_metric_arr, user_copy)
  
  
  return merge_tweetusers as unknown as FormattedUser
  
  
  } 