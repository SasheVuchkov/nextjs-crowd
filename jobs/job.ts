import {closeRedisConnection} from '../lib/dbs/redis/client';
import { TwitterApiResponseData, Tweet, User, FormattedTweet, FormattedUser } from "../lib/types";
import { fetchTweets } from "../lib/utils/streamTweetsUtils/fetchTweets";
import { getFormattedTweetObject, getFormattedUserObject } from "../lib/utils/streamTweetsUtils/formatData";
import {statsInDB, storeStatsInDB, storeTweetInDB, storeUserInDB} from '../lib/utils/streamTweetsUtils/storeData';
import makeFetchTweetsConfig from '../lib/utils/streamTweetsUtils/makeFetchTweetsConfig';
import {calcStats} from '../lib/utils/streamTweetsUtils/calcScores';
import {fetchUsersFromDB} from '../lib/utils/streamTweetsUtils/fetchRecords';

export default async function main(): Promise<void>{
  console.log('Fetching new tweets...');

  const response: TwitterApiResponseData = await fetchTweets(makeFetchTweetsConfig(100,  2));

  console.log('Just fetched new tweets...', response.meta);
    
  if (response['data']){

  const tweets: Tweet[] = response['data']

  let users: User[] = response['includes']['users']
  let formattedTweets: FormattedTweet[] = [];

  for(let x: number=0;x<tweets.length;x++){
      let tweet: Tweet=tweets[x]

      let formattedTweet: FormattedTweet= getFormattedTweetObject(tweet)

      if (formattedTweet.text.indexOf('RT @') === 0) {
        continue;
      }

      formattedTweets.push(formattedTweet);
      await storeTweetInDB (formattedTweet)
  }

    console.log('The new tweets were saved in Redis...');

    for(let y=0;y<users.length;y++){
      let user: User=users[y]
      let ownTweets = formattedTweets.filter(tweet => tweet.author_id === users[y].id);

      if (!ownTweets.length) {
        continue;
      }

      let formattedUser: FormattedUser = await getFormattedUserObject(user, ownTweets)
      await storeUserInDB(formattedUser)
    }

    console.log('The new users were saved in Redis...');

    console.log('Updating the stats...');

    const stats = await statsInDB();
    const recentUsers = await fetchUsersFromDB(0, 10000);
    const newStats = calcStats(formattedTweets, recentUsers, stats);
    await storeStatsInDB({...newStats, created_at_date: stats?.created_at_date || new Date()}, stats);

    await closeRedisConnection();
  }
  console.log('Finished processing the new tweets');
}





