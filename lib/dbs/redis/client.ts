import { Client } from 'redis-om'

const url = process.env.REDIS_URL
let redisClient: Client|undefined;

export async function getRedisClient() {
    if (!redisClient) {
        redisClient = new Client();
    }

    if (!redisClient.isOpen()) {
        await redisClient.open(url);
    }

    return redisClient;
}

export async function flushAll() {
    const client = await getRedisClient();
    return client.execute(['FLUSHALL']);
}

export async function closeRedisConnection() {
    if (redisClient && redisClient.isOpen()) {
        await redisClient.close();
    }
}