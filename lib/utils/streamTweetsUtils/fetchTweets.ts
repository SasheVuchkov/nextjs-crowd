import { Client } from "twitter-api-sdk"
import { TwitterApiResponseData } from "../../types";


export async function fetchTweets() {

    const client = new Client(process.env.TWITTER_BEARER_TOKEN);
    const tweetdata = await client.tweets.tweetsRecentSearch({
      "query": "next.js lang:en",
      "max_results": 10,   
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
    
    return tweetdata as TwitterApiResponseData;
  
  
    
  }
  