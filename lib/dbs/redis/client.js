import { Client } from 'redis-om';
import { config } from 'dotenv';
config();
const url = process.env.REDIS_URL;
const RedisClient = await new Client().open(url);
export { RedisClient };
