import { Client } from 'redis-om'
import {config} from 'dotenv'
config({path: './.env.local'})

const url = process.env.REDIS_URL
let redisClient: Client|undefined;

export const getRedisClient = async() => {
    if (!redisClient) {
        redisClient = new Client();
    }

    if (!redisClient.isOpen()) {
        await redisClient.open(url);
    }

    return redisClient;
}