import { EntityData } from "redis-om";
import { TweetRepository, UserRepository } from "../../dbs/redis/repository";
import { FormattedTweet, Tweet, FormattedUser, User } from "../../types";
import { updateTweetRecord, updateUserRecord } from "./updateRecord";



async function tweetIdInDB(id: string): Promise<Boolean>{

    const repo = await TweetRepository();

  const record = await repo.search()
  .where('id').equals(id).return.all()

    return record.length != 0
}


async function userIdInDB(id: string): Promise<Boolean>{

    const repo = await UserRepository()
  let record = await repo.search()
  .where('id').equals(id).return.all()


  if (record.length != 0){

    return true
  }

return false
}




export async function storeTweetInDB (tweet: FormattedTweet, tweet_from_raw_data: Tweet): Promise<void>{

    let TweetID = tweet['id']
  
    let TweetIdInDB = await tweetIdInDB(TweetID)
  
    if (TweetIdInDB) {
  
      await updateTweetRecord(TweetID, tweet_from_raw_data)
  
    }else{
        const repo = await TweetRepository();
        await repo.createAndSave(tweet as unknown as EntityData)
  }
  
  }
  
  export async function storeUserInDB (user: FormattedUser, user_from_raw_data: User): Promise<void>{
  
    let UserID = user['id']
  
    let UserIdInDB = await userIdInDB(UserID)
  
  
    if (UserIdInDB) {
  
      await updateUserRecord(UserID, user_from_raw_data)
  
    }else{
        const repo = await UserRepository();
        await repo.createAndSave(user as unknown as EntityData)
    }
  
  }