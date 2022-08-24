import { Entity } from 'redis-om'

export class EntityUser extends Entity{
  score: number;
  // followers_count: number;
  // following_count: number;
  // tweet_count: number;
  // listed_count: number;
}


export class EntityTweet extends Entity{
  score: number;
  // retweet_count: number;
  // reply_count: number;
  // like_count: number;
  // quote_count: number;
}
