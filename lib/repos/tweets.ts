import {MediaItem, Tweet, TwitterApiResponseData, User as UserEntity} from '../types';
import {assignUsersToTweets} from '../utils/tweets';

import data from '../mocks/data.json';

export const getRecentTweets = async (maxResults: number = 100): Promise<TwitterApiResponseData> => {
    return {
        tweets: assignUsersToTweets(data.data as Tweet[], data.includes.users as UserEntity[]),
        media: data.includes?.media ? data.includes.media as MediaItem[] : [],
        users: data.includes.users as UserEntity[],
    }
}
