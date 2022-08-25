import {EntityTweet, EntityUser} from '../../dbs/redis/entities';
import {getUserRepository, getTweetRepository} from '../../dbs/redis/repository'


export async function updateTweetRecord(tweet: EntityTweet): Promise<void>{
  const repo = await getTweetRepository();
  await repo.save(tweet)
}

export async function updateUserRecord(user: EntityUser): Promise<void>{

  const repo = await getUserRepository();
  await repo.save(user);

}