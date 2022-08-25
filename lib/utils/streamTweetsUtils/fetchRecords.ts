import { getTweetRepository, getUserRepository } from "../../dbs/redis/repository"
import {userIdInDB} from './storeData';
import {FormattedTweet, FormattedUser} from '../../types';
import getStartDate from '../getStartDate';
import {EntityTweet} from '../../dbs/redis/entities';

export async function fetchTweetsFromDB(offset: number, count: number = 100) {
  const repo = await getTweetRepository()
  const result = await repo.search().where('created_at_date').gt(getStartDate()).sortDescending('score').return.page(offset, count)
  const tweets: FormattedTweet[] = [];

  for (const tweet of result) {
    const formattedTweet = mapEntityTweet(tweet);

    const userEntity = await userIdInDB(formattedTweet.author_id);

    if (userEntity) {
      const userData = userEntity.toJSON();
      delete userData.saved_at_date;
      formattedTweet.user = {...userData as FormattedUser, tweets: []};
    }

    tweets.push(formattedTweet);
  }

  return tweets;
}


export async function fetchTweetsByUser(user: FormattedUser) {
  const repo = await getTweetRepository()

  const result = await repo.search().where('created_at_date').gt(getStartDate()).where('author_id').eq(user.id).sortDescending('score').return.page(0, 50)

  const tweets: FormattedTweet[] = [];

  for (const tweet of result) {
    const formattedTweet = mapEntityTweet(tweet);
    formattedTweet.user = {...user};
    tweets.push(formattedTweet);
  }

  return tweets;
}


export function mapEntityTweet(entityTweet: EntityTweet): FormattedTweet {
  const data = entityTweet.toJSON();
  delete data.created_at_date;
  return {
    ...data as FormattedTweet,
    user: null,
  }
}

export async function fetchUsersFromDB(offset: number, count: number = 100){
  const repo = await getUserRepository()
  const result = await repo.search().where('saved_at_date').gt(getStartDate()).sortDescending('score').return.page(offset, count)
  const users: FormattedUser[] = [];


  for (const user of result) {
    const data = user.toJSON();
    delete data.saved_at_date;
    users.push(data as FormattedUser);
  }

  return users;
}
