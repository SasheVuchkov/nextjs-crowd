import {FormattedTweet, FormattedUser} from '../types';

//Sashe Vuchkov: Let's put the url generation in a factory function so if it changes we edit it in one place

export const getTweetUrl = (tweet: FormattedTweet) => `https://twitter.com/${tweet.user?.username}/status/${tweet.id}`;

export const getTwitterProfileUrl = (user: FormattedUser) => `https://twitter.com/${user.username}`;

export const assignUsersToTweets = (tweets: FormattedTweet[], users: FormattedUser[]): FormattedTweet[] => tweets.map(tweet => ({...tweet, user: ([...users].filter(user => user.id === tweet.author_id).pop())}));



