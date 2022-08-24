import { getRedisClient } from "../lib/dbs/redis/client";
import { TwitterApiResponseData, Tweet, User, FormattedTweet, FormattedUser } from "../lib/types";
import { fetchTweets } from "../lib/utils/streamTweetsUtils/fetchTweets";
import { getFormattedTweetObject, getFormattedUserObject } from "../lib/utils/streamTweetsUtils/formatData";
import { storeTweetInDB, storeUserInDB } from "../lib/utils/streamTweetsUtils/storeData";




async function main(): Promise<void>{


  const tweetdata: TwitterApiResponseData = await fetchTweets();

    
  if (tweetdata['data']){

  const tweets: Tweet[] = tweetdata['data']

  let users: User[] = tweetdata['includes']['users']


  for(let x: number=0;x<tweets.length;x++){

      let tweet: Tweet=tweets[x]

      let formattedtweet: FormattedTweet=getFormattedTweetObject(tweet)

      await storeTweetInDB (formattedtweet, tweet)

 
    }

    for(let y=0;y<users.length;y++){


      let user: User=users[y]


      let formatteduser: FormattedUser = await getFormattedUserObject(user)

      await storeUserInDB (formatteduser, user)

      
    }
    
    const redisClient = await getRedisClient();
    await redisClient.close();
  }

    
}


main().catch(err => console.error(err.stack || err.message));




