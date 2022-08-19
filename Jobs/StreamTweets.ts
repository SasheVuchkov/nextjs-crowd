import { Client } from "twitter-api-sdk"
import {UserRepository, TweetRepository} from '../lib/dbs/redis/repository'
import {config} from 'dotenv'
import { TweetPublicMetrics, Tweet, FormattedUser, FormattedTweet, User, TwitterApiResponseData } from '../lib/types'
import {RedisClient} from '../lib/dbs/redis/client'
config()

if (process.env.BearerTOKEN){

var TOKEN: string = process.env.BearerTOKEN
}else{

  throw new Error("Twitter bearer token not defined as environment variable");
}

async function main(): Promise<void>{


  const TweetData: TwitterApiResponseData = await fetchTweets()

  if (TweetData['data']){

  const tweets: Tweet[] = TweetData['data']

  let users: User[] = TweetData['includes']['users']


  for(let x: number=0;x<tweets.length;x++){

      let tweet: Tweet=tweets[x]

      var formattedtweet: FormattedTweet=getFormattedTweetObject(tweet)

      await StoreTweetInDB (formattedtweet, tweet)

 
    }
  
    for(let y=0;y<users.length;y++){


      let user: User=users[y]


      let formatteduser: FormattedUser=await getFormattedUserObject(user)

      await StoreUserInDB (formatteduser, user)

      
    }
    
    await RedisClient.close()
  }else{

    return
  }


}

async function calcUserEngagement(Authorid: string): Promise<number>{

  var records = await TweetRepository.search()
  .where('author_id').equals(Authorid).return.all()

  var sum_of_tweet_scores = 0

  for(let i=0;i<records.length;i++){


      var record = records[i]

      var entityId = record.entityId

      var fetchrecord = await TweetRepository.fetch(entityId)

      var score = fetchrecord.score

      sum_of_tweet_scores = sum_of_tweet_scores + score

 
    }

    return sum_of_tweet_scores

}


function calcTweetScore(tweet: Tweet): number {


  var {retweet_count, reply_count, like_count, quote_count}: 
  {retweet_count: number, reply_count: number, like_count: number, quote_count: number} = tweet['public_metrics']

  var score = retweet_count + reply_count + like_count + quote_count

  return score

}

async function calcUserScore(user: User): Promise<number> {


  var {followers_count, following_count, tweet_count, listed_count}:
  {followers_count: number, following_count: number, tweet_count: number, listed_count: number} = user['public_metrics']

  var Authorid = user.id

  var engagement = await calcUserEngagement(Authorid)

  var score = (followers_count / following_count) * (engagement * 50)

  return score

}

function getFormattedTweetObject(tweet: Tweet): FormattedTweet{

    let copy_tweet = JSON.parse(JSON.stringify( tweet ))

    var tweet_score =  calcTweetScore(copy_tweet)

    copy_tweet['score'] = tweet_score

    delete copy_tweet["public_metrics"]

    return copy_tweet


} 

async function getFormattedUserObject(user: User): Promise<FormattedUser>{


  let tweetuser = JSON.parse(JSON.stringify( user ))
  
  let user_score = await calcUserScore(tweetuser)

  tweetuser['score'] = user_score

  delete tweetuser["public_metrics"]

  return tweetuser


} 


async function updateTweetRecord(id: string, tweet_from_raw_data: Tweet): Promise<void>{

  var record = await TweetRepository.search()
  .where('id').equals(id).return.all()

  var entityId_of_record = record[0].entityId

  var fetchRecordforUpdate = await TweetRepository.fetch(entityId_of_record)

  fetchRecordforUpdate.score = calcTweetScore(tweet_from_raw_data)

  await TweetRepository.save(fetchRecordforUpdate)

}

async function updateUserRecord(id: string, user_from_raw_data: User): Promise<void>{

  var record = await UserRepository.search()
  .where('id').equals(id).return.all()


  var entityId_of_record = record[0].entityId

  var fetchRecordforUpdate = await UserRepository.fetch(entityId_of_record)

  fetchRecordforUpdate.score = await calcUserScore(user_from_raw_data)

  await UserRepository.save(fetchRecordforUpdate)

}


async function tweetIdInDB(id: string): Promise<Boolean>{

  var record = await TweetRepository.search()
  .where('id').equals(id).return.all()

  if (record.length != 0){

    return true
  }

return false
}

async function userIdInDB(id: string): Promise<Boolean>{

  var record = await UserRepository.search()
  .where('id').equals(id).return.all()


  if (record.length != 0){

    return true
  }

return false
}





async function StoreTweetInDB (tweet: FormattedTweet, tweet_from_raw_data: Tweet): Promise<void>{

  var TweetID = tweet['id']

  var TweetIdInDB = await tweetIdInDB(TweetID)

  if (TweetIdInDB) {

    await updateTweetRecord(TweetID, tweet_from_raw_data)

  }else{


  TweetRepository.createAndSave(tweet)
}

}

async function StoreUserInDB (user: FormattedUser, user_from_raw_data: User): Promise<void>{

  var UserID = user['id']

  var UserIdInDB = await userIdInDB(UserID)


  if (UserIdInDB) {

    await updateUserRecord(UserID, user_from_raw_data)

  }else{


  UserRepository.createAndSave(user)
}

}

async function fetchTweets() {

  const client = new Client(TOKEN);
  const tweetdata = await client.tweets.tweetsRecentSearch({
    "query": "next.js lang:en",
    "max_results": 10,   
    "tweet.fields": [
        "created_at",
        "public_metrics"
    ],
    "expansions": [
        "author_id"
    ],
    "user.fields": [
        "created_at",
        "description",
        "profile_image_url",
        "public_metrics",
        "verified"
    ]
  });
  
  return tweetdata


  
}



main()




