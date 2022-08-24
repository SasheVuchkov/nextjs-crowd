import { EntityTweet } from '../../dbs/redis/entities';
import {UserRepository, TweetRepository} from '../../dbs/redis/repository'
import { FormattedTweet, FormattedUser, Tweet, User } from '../../types'
import {calcTweetScore, calcUserScore} from './calcScores'


export async function updateTweetRecord(id: string, tweet_from_raw_data: Tweet): Promise<void>{

    const repo = await TweetRepository();

  let record = await repo.search()
  .where('id').equals(id).return.all()

  let {retweet_count, reply_count, like_count, quote_count}: 
  {retweet_count: number, reply_count: number, like_count: number, quote_count: number} = tweet_from_raw_data['public_metrics']


  let entityId_of_record = record[0].entityId

  let fetchRecordforUpdate = await repo.fetch(entityId_of_record) as unknown as FormattedTweet

  fetchRecordforUpdate.score = calcTweetScore(tweet_from_raw_data)

  fetchRecordforUpdate.retweet_count = retweet_count

  fetchRecordforUpdate.reply_count = reply_count

  fetchRecordforUpdate.like_count = like_count

  fetchRecordforUpdate.quote_count = quote_count


  await repo.save(fetchRecordforUpdate as unknown as EntityTweet)

}

export async function updateUserRecord(id: string, user_from_raw_data: User): Promise<void>{

  const repo = await UserRepository();
  let record = await repo.search()
  .where('id').equals(id).return.all()


  let entityId_of_record = record[0].entityId

  let {followers_count, following_count, tweet_count, listed_count}:
  {followers_count: number, following_count: number, tweet_count: number, listed_count: number} = user_from_raw_data['public_metrics']

  let fetchRecordforUpdate = await repo.fetch(entityId_of_record) as unknown as FormattedUser

  fetchRecordforUpdate.score = await calcUserScore(user_from_raw_data)

  fetchRecordforUpdate.followers_count = followers_count

  fetchRecordforUpdate.following_count = following_count

  fetchRecordforUpdate.tweet_count = tweet_count

  fetchRecordforUpdate.listed_count = listed_count

  await repo.save(fetchRecordforUpdate as unknown as EntityTweet)

}