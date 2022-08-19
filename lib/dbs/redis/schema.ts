import { Schema } from 'redis-om'
import {EntityTweet, EntityUser} from './entities'

export const tweetSchema = new Schema(EntityTweet, {
    id: { type: 'string' },
    text: { type: 'string' },
    author_id: { type: 'string' },
    created_at: { type: 'string' },
    score: {type: 'number'}

  })


export const userSchema = new Schema(EntityUser, {

    id: {type: 'string'},
    name: {type: 'string'},
    username: {type: 'string'},
    url: {type: 'string'},
    profile_image_url: {type: 'string'},
    description: {type: 'string'},
    created_at: {type: 'string'},
    verified: {type: 'boolean'},
    score: {type: 'number'}


})



