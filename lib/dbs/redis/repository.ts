import { RedisClient } from './client'
import { tweetSchema, userSchema } from './schema'


const TweetRepository = RedisClient.fetchRepository(tweetSchema)

TweetRepository.createIndex()



const UserRepository = RedisClient.fetchRepository(userSchema)

UserRepository.createIndex()

export {UserRepository, TweetRepository}
   