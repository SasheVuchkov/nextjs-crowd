import { getRedisClient } from './client'
import {statsSchema, tweetSchema, userSchema} from './schema'


export const getTweetRepository = async () => {
    const client = await getRedisClient();
    const repo = client.fetchRepository(tweetSchema);
    await repo.createIndex()

    return repo;
}


export const getUserRepository = async () => {
    const client = await getRedisClient();
    const repo = client.fetchRepository(userSchema);
    await repo.createIndex()

    return repo;
}

export const getStatsRepository = async () => {
    const client = await getRedisClient();
    const repo = client.fetchRepository(statsSchema);
    await repo.createIndex()

    return repo;
}