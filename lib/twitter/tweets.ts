import { getRedisClient } from "../dbs/redis/client"
import { TweetRepository, UserRepository } from "../dbs/redis/repository"


export async function fetchTweetsFromDB(offset: number){

  const max_number_result =  100

  const repo = await TweetRepository()

  const result = await repo.search().sortDescending('score').return.page(offset, max_number_result )



  const formatted_result = result.map(function(val){

          return val['entityFields']

              }).map(function(val){

                return {

                  id: val['id']._value,

                  text: val['text']._value,

                  author_id: val['author_id']._value,

                  created_at: val['created_at']._value,

                  score: val['score']._value,

                  retweet_count: val['retweet_count']._value,

                  reply_count: val['reply_count']._value,

                  like_count: val['like_count']._value,

                  quote_count: val['quote_count']._value,

                  entities: val['entities']._value,

                }
              })

      return formatted_result

}

export async function fetchUserFromDB(offset: number){

  const max_number_result =  100

  const repo = await UserRepository()

  const result = await repo.search().sortDescending('score').return.page(offset, max_number_result )



  const formatted_result = result.map(function(val){

          return val['entityFields']

              }).map(function(val){

                return {

                  id: val['id']._value,

                  name: val['name']._value,

                  username: val['username']._value,

                  url: val['url']._value,

                  profile_image_url: val['profile_image_url']._value,

                  description: val['description']._value,

                  created_at: val['created_at']._value,

                  verified: val['verified']._value,

                  score: val['score']._value,

                  followers_count: val['followers_count']._value,

                  following_count: val['following_count']._value,

                  tweet_count: val['tweet_count']._value,

                  listed_count: val['listed_count']._value,

                  entities: val['entities']._value
              
                }
              })

      return formatted_result


}

export async function fetchDataFromDB (offset: number){

  const userData = await fetchUserFromDB(offset)
  
  const tweetData = await fetchTweetsFromDB(offset)
  
  const redisClient = await getRedisClient()

  await redisClient.close()
  
  return { tweets: tweetData, users: userData }


}

