import { Tweet, FormattedTweet, User, FormattedUser } from "../../types"
import { calcTweetScore, calcUserScore } from "./calcScores"

export function getFormattedTweetObject(tweet: Tweet): FormattedTweet{

    let public_metric_arr = tweet["public_metrics"]
  
    let copy_tweet: Tweet = JSON.parse(JSON.stringify( tweet ))
  
    copy_tweet['entities'] = JSON.stringify(copy_tweet['entities'])
  
    copy_tweet['user'] =  null
  
    let tweet_score =  calcTweetScore(copy_tweet)
  
    copy_tweet['score'] = tweet_score
  
    delete copy_tweet["public_metrics"]
  
    let merge_copy_tweets = Object.assign({}, public_metric_arr, copy_tweet)
  
  
    return merge_copy_tweets as unknown as FormattedTweet
  
  
  } 
  
export async function getFormattedUserObject(user: User): Promise<FormattedUser>{
  
  let public_metric_arr = user["public_metrics"]
  
  let user_copy: User = JSON.parse(JSON.stringify(user))
  
  user_copy['entities'] = JSON.stringify(user_copy['entities'])
  
  user_copy['tweets'] =  null
  
  let user_score = await calcUserScore(user_copy)
  
  user_copy['score'] = user_score
  
  delete user_copy["public_metrics"]
  
  let merge_tweetusers = Object.assign({}, public_metric_arr, user_copy)
  
  
  return merge_tweetusers as unknown as FormattedUser
  
  
  } 