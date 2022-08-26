# Next.Js Crowd - Who's Talking About Next.Js?

It's a simple app that monitors Twitter and detects users that mention the react framework Next.js. The point is to collect all their tweets, process their public metrics like the number of likes, retweets, and replies, and finally, rank the discovered users by a score.

[App's Top Users Screen](https://nextjs.buhalbu.com/images/nextjs-crowd-screenshot1.jpg)
[App's Top Tweets Screen](https://nextjs.buhalbu.com/images/nextjs-crowd-screenshot1.jpg)
[App's About Screen](https://nextjs.buhalbu.com/images/nextjs-crowd-screenshot1.jpg)


# Overview video (Optional)

Here's a short video that explains the project and how it uses Redis:

[Insert your own video here, and remove the one below]

[![Embed your YouTube video](https://i.ytimg.com/vi/QDa-ZEHurxA/maxresdefault.jpg)](https://www.youtube.com/watch?v=QDa-ZEHurxA)

## How it works

So the app works in two primary modes. We have a scheduled job that emits messages every two minutes. Our app listens for those messages, and on every message, it "asks" Twitter whether there are new tweets with the desired keyword next.js.

If there aren't any new tweets, then everything is cool, and that's the end of the story.

If there are new tweets, the app processes them by mapping their data to our internal data types, and it calculates their "scores" that it later uses to rank them by popularity.

In the next step, the new data is saved in a Redis Database as documents. We use the awesome RedisJSON module.

Then the app gets a JSON document from Redis with the current day's general stats. It updates those stats and saves them.

That's the final step.

In the second mode, the app is accessible on the web. When a web visitor opens it with their browser, it fetches data from our Redis database, generates the response, and then sends it back to the browser.

Now the web visitor can see either a list of ranked Twitter users or a list of ranked tweets.

### How the data is stored:

We use Redis to replace Mongo in the famous MEAN stack so our RedisJSON module is turned on, and we save several different document types.

We have a Tweet, User and a Stat document. I think it's self explementory what data holds each one of these documents.

Here there are our schema declarations:

```
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
```

```
  export const userSchema = new Schema(EntityUser, {

    id: {type: 'string'},
    name: {type: 'string'},
    username: {type: 'string'},
    url: {type: 'string'},
    profile_image_url: {type: 'string'},
    description: {type: 'string'},
    created_at: {type: 'string'},
    saved_at_date: {type: 'date'},
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
```

```
export const statsSchema = new Schema(EntityStats, {
    created_at: {type: 'string'},
    created_at_date: {type: 'date'},
    total_tweets: {type: 'number'},
    total_likes: {type: 'number'},
    total_retweets: {type: 'number'},
    total_replies: {type: 'number'},
    total_users: {type: 'number'},
    total_followers: {type: 'number'},
    total_engagement: {type: 'number'},
    total_engagement_rate: {type: 'string'},
})
```
### How the data is accessed:

We use the handy Redis OM library for Node.Js that helps us fetch data really easy.

How we fetch users ranked by a score:

```

await repo.search().where('saved_at_date').gt(getStartDate()).sortDescending('score').return.page(offset, count);

```

How we fetch tweet ranked by a score:

```

await repo.search().where('created_at_date').gt(getStartDate()).sortDescending('score').return.page(offset, count)

```

How we fetch tweets owned by a specific user:

```

await repo.search().where('created_at_date').gt(getStartDate()).where('author_id').eq(userId).sortDescending('score').return.page(0, 50)

```

## How to run it locally?

[Make sure you test this with a fresh clone of your repo, these instructions will be used to judge your app.]

### Prerequisites

- Node - v16.1.0
- NPM - v8.10.0
- Docker - v20.10.12

### Local installation

Step 1. Clone the repo:

```

git clone https://github.com/SasheVuchkov/nextjs-crowd.git nextjs-js

```

Step 2. Add your credentials to env.local and env.job.local files:

```

# copy file and set proper data inside
cp .env.example .env.local
cp .env.job.example .env.job.local


Step 3. Build the docker image

```
# open the folder

cd ./nextjs-crowd


# build the image

docker build . -t nextjs-crowd

```

Step 4. Start a docker container

```
docker run -p 3000:80 nextjs-crowd

```

Step 5. Open the app in a browser

```
http://localhost
```

## More Information about Redis Stack

Here some resources to help you quickly get started using Redis Stack. If you still have questions, feel free to ask them in the [Redis Discord](https://discord.gg/redis) or on [Twitter](https://twitter.com/redisinc).

### Getting Started

1. Sign up for a [free Redis Cloud account using this link](https://redis.info/try-free-dev-to) and use the [Redis Stack database in the cloud](https://developer.redis.com/create/rediscloud).
1. Based on the language/framework you want to use, you will find the following client libraries:
    - [Redis OM .NET (C#)](https://github.com/redis/redis-om-dotnet)
        - Watch this [getting started video](https://www.youtube.com/watch?v=ZHPXKrJCYNA)
        - Follow this [getting started guide](https://redis.io/docs/stack/get-started/tutorials/stack-dotnet/)
    - [Redis OM Node (JS)](https://github.com/redis/redis-om-node)
        - Watch this [getting started video](https://www.youtube.com/watch?v=KUfufrwpBkM)
        - Follow this [getting started guide](https://redis.io/docs/stack/get-started/tutorials/stack-node/)
    - [Redis OM Python](https://github.com/redis/redis-om-python)
        - Watch this [getting started video](https://www.youtube.com/watch?v=PPT1FElAS84)
        - Follow this [getting started guide](https://redis.io/docs/stack/get-started/tutorials/stack-python/)
    - [Redis OM Spring (Java)](https://github.com/redis/redis-om-spring)
        - Watch this [getting started video](https://www.youtube.com/watch?v=YhQX8pHy3hk)
        - Follow this [getting started guide](https://redis.io/docs/stack/get-started/tutorials/stack-spring/)

The above videos and guides should be enough to get you started in your desired language/framework. From there you can expand and develop your app. Use the resources below to help guide you further:

1. [Developer Hub](https://redis.info/devhub) - The main developer page for Redis, where you can find information on building using Redis with sample projects, guides, and tutorials.
1. [Redis Stack getting started page](https://redis.io/docs/stack/) - Lists all the Redis Stack features. From there you can find relevant docs and tutorials for all the capabilities of Redis Stack.
1. [Redis Rediscover](https://redis.com/rediscover/) - Provides use-cases for Redis as well as real-world examples and educational material
1. [RedisInsight - Desktop GUI tool](https://redis.info/redisinsight) - Use this to connect to Redis to visually see the data. It also has a CLI inside it that lets you send Redis CLI commands. It also has a profiler so you can see commands that are run on your Redis instance in real-time
1. Youtube Videos
    - [Official Redis Youtube channel](https://redis.info/youtube)
    - [Redis Stack videos](https://www.youtube.com/watch?v=LaiQFZ5bXaM&list=PL83Wfqi-zYZFIQyTMUU6X7rPW2kVV-Ppb) - Help you get started modeling data, using Redis OM, and exploring Redis Stack
    - [Redis Stack Real-Time Stock App](https://www.youtube.com/watch?v=mUNFvyrsl8Q) from Ahmad Bazzi
    - [Build a Fullstack Next.js app](https://www.youtube.com/watch?v=DOIWQddRD5M) with Fireship.io
    - [Microservices with Redis Course](https://www.youtube.com/watch?v=Cy9fAvsXGZA) by Scalable Scripts on freeCodeCamp
