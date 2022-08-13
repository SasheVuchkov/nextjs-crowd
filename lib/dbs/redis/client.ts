import { Client } from 'redis-om'


const url = process.env.REDIS_URL

async function CreateRedisClient(): Promise<Client>{

const client = await new Client().open(url)
return client

}

const RedisClient=CreateRedisClient()

export default RedisClient