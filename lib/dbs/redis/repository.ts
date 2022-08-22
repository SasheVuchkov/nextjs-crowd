import { getRedisClient } from './client'
import { tweetSchema, userSchema } from './schema'


export const TweetRepository = async () => {
    const client = await getRedisClient();
    const repo = client.fetchRepository(tweetSchema);
    await repo.createIndex()

    return repo;
}


export const UserRepository = async () => {
    const client = await getRedisClient();
    const repo = client.fetchRepository(userSchema);
    await repo.createIndex()

    return repo;
}
   