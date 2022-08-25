import { Client } from "twitter-api-sdk"
import { TwitterApiResponseData } from "../../types";


export async function fetchTweets(config: {maxResults: number, startTime: string, endTime: string}) {

    const client = new Client(process.env.TWITTER_BEARER_TOKEN);
    const tweetData = await client.tweets.tweetsRecentSearch({
      "query": "next.js lang:en",
      "max_results": config.maxResults,
      "start_time": config.startTime,
      "end_time": config.endTime,
      "tweet.fields": [
          "created_at",
          "public_metrics",
          "entities"
      ],
      "expansions": [
          "author_id"
      ],
      "user.fields": [
          "created_at",
          "description",
          "profile_image_url",
          "public_metrics",
          "verified",
          "entities"
      ]
    });
    
    return tweetData as TwitterApiResponseData;
    
  }
  