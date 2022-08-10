import {MediaItem, Tweet, TwitterApiResponseData, User as UserEntity} from '../types';
import {memoryCache} from '../utils/cache';
import {assignUsersToTweets} from '../utils/tweets';

export const getRecentTweets = async (maxResults: number = 100): Promise<TwitterApiResponseData> => {
    const cache = await memoryCache.get('latest_tweets');

    if (cache) {
        return cache as TwitterApiResponseData;
    }

    const result = await fetch(`https://api.twitter.com/2/tweets/search/recent?query=nextjs lang:en&max_results=${maxResults}&tweet.fields=public_metrics,created_at&expansions=author_id,attachments.media_keys&media.fields=url,preview_image_url,alt_text&user.fields=profile_image_url,public_metrics,created_at,description,entities,url,verified`, {headers: {
            'Authorization': `Bearer ${process.env.TWITTER_API_KEY as string}`
        }})

    if (!result.ok) {
        const data = await result.json();
        console.warn(data);
        throw new Error('Something went wrong file fetching data from Twitter');
    }

    const data = await result.json();

    const responseData: TwitterApiResponseData = {
        tweets: assignUsersToTweets(data.data as Tweet[], data.includes.users as UserEntity[]),
        media: data.includes?.media ? data.includes.media as MediaItem[] : [],
        users: data.includes.users as UserEntity[],
    }

    await memoryCache.set('latest_tweets', responseData);
    return responseData;
}
