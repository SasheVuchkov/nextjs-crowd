import { EntityData } from "redis-om";
import {getStatsRepository, getTweetRepository, getUserRepository} from '../../dbs/redis/repository';
import {FormattedTweet, Tweet, FormattedUser, User, FormattedStats} from '../../types';
import { updateTweetRecord, updateUserRecord } from "./updateRecord";
import {EntityStats, EntityTweet, EntityUser} from '../../dbs/redis/entities';
import getStartDate from '../getStartDate';



export async function tweetIdInDB(id: string): Promise<EntityTweet|undefined>{
    const repo = await getTweetRepository();
    const record = await repo.search().where('id').equals(id).return.all()
    return record.shift();
}


export async function userIdInDB(id: string): Promise<EntityUser|undefined>{
    const repo = await getUserRepository()
  let record = await repo.search()
  .where('id').equals(id).where('saved_at_date').gt(getStartDate()).return.all()

    return record.shift();
}

export async function statsInDB(): Promise<EntityStats|undefined>{
    const repo = await getStatsRepository()
    let record = await repo.search().where('created_at_date').gt(getStartDate()).return.all()
    return record.shift();
}

export async function storeStatsInDB(stats: FormattedStats & {created_at_date: Date}): Promise<void> {
    const repo = await getStatsRepository()
    await repo.createAndSave(stats);
}


export async function storeTweetInDB (tweet: FormattedTweet): Promise<void>{
    let TweetID = tweet['id']
    let tweetEntity = await tweetIdInDB(TweetID)

    if (tweetEntity) {
        tweetEntity.score = tweet.score;
        tweetEntity.like_count = tweet.like_count;
        tweetEntity.reply_count = tweet.reply_count;
        tweetEntity.retweet_count = tweet.retweet_count;
        tweetEntity.quote_count = tweet.quote_count;
      await updateTweetRecord(tweetEntity)

    } else {
        const repo = await getTweetRepository();
        await repo.createAndSave(tweet as unknown as EntityData)
  }

  }

  export async function storeUserInDB (user: FormattedUser): Promise<void>{
    let userInDB = await userIdInDB(user['id'])

    if (userInDB) {
        userInDB.score = (userInDB.score + user.score) / 2;
        userInDB.name = user.name;
        userInDB.username = user.username;
        userInDB.url = user.url;
        userInDB.following_count = user.following_count;
        userInDB.followers_count = user.followers_count;
        userInDB.description = user.description;
        userInDB.profile_image_url = user.profile_image_url;
        userInDB.verified = user.verified;
        userInDB.tweet_count = user.tweet_count;
        userInDB.like_count = user.listed_count;
        userInDB.entities = user.entities;

      await updateUserRecord(userInDB)

    } else {
        const repo = await getUserRepository();
        await repo.createAndSave(user as unknown as EntityData)
    }

  }