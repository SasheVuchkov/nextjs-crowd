import { Entity } from 'redis-om'

export class EntityUser extends Entity{
  score!: number;
}


export class EntityTweet extends Entity{
  score!: number;
}
