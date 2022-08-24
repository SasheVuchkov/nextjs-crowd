
import {Entity, Schema} from 'redis-om';
import {getRedisClient} from '../client';

export class Register extends Entity {}

export const registerSchema = new Schema(Register, {
    start_tweet: {type: 'string'},
    end_tweet: {type: 'string'},
    total_tweets: {type: 'number'},
    date: {type: 'date'},
})

export const getRegisterRepository = async () => {
    const client = await getRedisClient();
    const repository = client.fetchRepository(registerSchema);
    await repository.createIndex();

    return repository;
}