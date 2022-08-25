import { Entity } from 'redis-om'


export class EntityStats extends Entity {
  created_at: string;
  created_at_date: Date;
  total_tweets: number;
  total_likes: number;
  total_retweets: number;
  total_replies: number;
  total_users: number;
  total_followers: number;
  total_engagement: number;
  total_engagement_rate: string;
}

export class EntityUser extends Entity{
  score: number;
  followers_count: number;
  following_count: number;
  tweet_count: number;
  listed_count: number;
  retweet_count: number;
  reply_count: number;
  like_count: number;
  quote_count: number;
  id: string;
  name: string;
  username: string;
  url: string;
  profile_image_url: string;
  description: string;
  created_at: string;
  saved_at_date: Date;
  verified: boolean;
  entities: string;
}


export class EntityTweet extends Entity{
  score: number;
  retweet_count: number;
  reply_count: number;
  like_count: number;
  quote_count: number;
  id: string;
  text: string;
  created_at: string;
  created_at_date: Date;
  entities: string;
  author_id: string;
}
