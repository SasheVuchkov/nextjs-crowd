import { TweetRepository } from "../../dbs/redis/repository";
import { Tweet, User } from "../../types";


async function calcUserEngagement(Authorid: string): Promise<number>{

    const repo = await TweetRepository();

  let records = await repo.search()
  .where('author_id').equals(Authorid).return.all()

  let sum_of_tweet_scores = 0

  for(let i=0;i<records.length;i++){


      let record = records[i]

      let entityId = record.entityId

      let fetchrecord = await repo.fetch(entityId)

      let score = fetchrecord.score

      sum_of_tweet_scores = sum_of_tweet_scores + score

 
    }

    return sum_of_tweet_scores

}

export function calcTweetScore(tweet: Tweet): number {


    let {retweet_count, reply_count, like_count, quote_count}: 
    {retweet_count: number, reply_count: number, like_count: number, quote_count: number} = tweet['public_metrics']
  
    let score = retweet_count + reply_count + like_count + quote_count
  
    return score
  
  }
  
export async function calcUserScore(user: User): Promise<number> {
  
  
    let {followers_count, following_count, tweet_count, listed_count}:
    {followers_count: number, following_count: number, tweet_count: number, listed_count: number} = user['public_metrics']
  
    let authorid = user.id
  
    let engagement = await calcUserEngagement(authorid)
  
    let score = (followers_count / following_count) * (engagement * 50)
  
    return score
  
  }
  