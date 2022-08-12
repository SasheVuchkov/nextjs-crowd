import {Tweet, User, User as UserEntity} from '../types';

//Sashe Vuchkov: Let's put the url generation in a factory function so if it changes we must edit it in one place
export const getTweetUrl = (tweet: Tweet) => `https://twitter.com/${tweet.user?.username}/status/${tweet.id}`;

export const getTwitterProfileUrl = (user: User) => `https://twitter.com/${user.username}`;

export const assignUsersToTweets = (tweets: Tweet[], users: UserEntity[]): Tweet[] => tweets.map(tweet => ({...tweet, user: ([...users].filter(user => user.id === tweet.author_id).pop())}));
