import * as cron from 'node-cron';
import {closeRedisConnection, getRedisClient} from '../lib/dbs/redis/client';
import { TwitterApiResponseData, Tweet, User, FormattedTweet, FormattedUser } from "../lib/types";
import { fetchTweets } from "../lib/utils/streamTweetsUtils/fetchTweets";
import { getFormattedTweetObject, getFormattedUserObject } from "../lib/utils/streamTweetsUtils/formatData";
import { storeTweetInDB, storeUserInDB } from "../lib/utils/streamTweetsUtils/storeData";
import makeFetchTweetsConfig from '../lib/utils/streamTweetsUtils/makeFetchTweetsConfig';

async function main(): Promise<void>{
  console.log('Start fetching new tweets...');

  const response: TwitterApiResponseData = await fetchTweets(makeFetchTweetsConfig(100,  1));

  console.log('Just fetched new tweets...', response.meta);
    
  if (response['data']){

  const tweets: Tweet[] = response['data']

  let users: User[] = response['includes']['users']
  let formattedTweets: FormattedTweet[] = [];

  for(let x: number=0;x<tweets.length;x++){
      let tweet: Tweet=tweets[x]

      let formattedTweet: FormattedTweet= getFormattedTweetObject(tweet)
      formattedTweets.push(formattedTweet);
      await storeTweetInDB (formattedTweet)
  }

    console.log('The new tweets were saved in Redis...');

    for(let y=0;y<users.length;y++){
      let user: User=users[y]
      let ownTweets = formattedTweets.filter(tweet => tweet.author_id === users[y].id);


      let formattedUser: FormattedUser = await getFormattedUserObject(user, ownTweets)
      await storeUserInDB (formattedUser)

      
    }

    await closeRedisConnection();
  }

  console.log('The new users were saved in Redis...');
  console.log('Finished processing the new tweets');
}

cron.schedule('* * * * *', () => {
  main().catch(err => console.error(err.stack || err.message));
})






