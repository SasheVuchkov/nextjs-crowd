import { Schema } from 'redis-om'
import {EntityTweet, EntityUser} from './entities'

export const tweetSchema = new Schema(EntityTweet, {
    id: { type: 'string' },
    text: { type: 'string' },
    author_id: { type: 'string' },
    created_at: { type: 'string' },
    created_at_date: {type: 'date'},
    score: {type: 'number', sortable: true},
    retweet_count: {type: 'number'}, 
    reply_count: {type: 'number'},
    like_count: {type: 'number'}, 
    quote_count: {type: 'number'},
    entities: {type: 'string'}



  })


  export const userSchema = new Schema(EntityUser, {

    id: {type: 'string'},
    name: {type: 'string'},
    username: {type: 'string'},
    url: {type: 'string'},
    profile_image_url: {type: 'string'},
    description: {type: 'string'},
    created_at: {type: 'string'},
    created_at_date: {type: 'date'},
    verified: {type: 'boolean'},
    score: {type: 'number', sortable: true},
    followers_count: {type: 'number'},
    following_count: {type: 'number'},
    tweet_count: {type: 'number'},
    listed_count: {type: 'number'},
    entities: {type: 'string'},
    retweet_count: {type: 'number'},
    reply_count: {type: 'number'},
    like_count: {type: 'number'},
    quote_count: {type: 'number'},
})


