
export type TweetPublicMetrics = {
    retweet_count: number, 
    reply_count: number, 
    like_count: number, 
    quote_count: number
};

export type Tweet = {
    id: string,
    author_id: string,
    text: string,
    created_at: string,
    public_metrics: TweetPublicMetrics,
    user?: User,
}

export type FormattedTweet = {
    id: string,
    author_id: string,
    text: string,
    created_at: string,
    score: number
    // user?: User,
}

export type MediaItem = {
    url: string,
    media_key: string,
    type: string,
}

export type UserPublicMetrics = {
    followers_count: number,
    following_count: number,
    tweet_count: number,
    listed_count: number,
}

export type Entity = {
    [key: string]: any,
    start: number,
    end: number,
    url?: string,
    expanded_url?: string,
    display_url?: string,
    username?: string,
}

export type User = {
    id: string,
    name: string,
    username: string,
    url: string,
    profile_image_url: string,
    description: string,
    created_at: string,
    verified: boolean,
    public_metrics: UserPublicMetrics
}

export type FormattedUser = {
    id: string,
    name: string,
    username: string,
    url: string,
    profile_image_url: string,
    description: string,
    created_at: string,
    verified: boolean,
    score: number
}

export type Stat = {
    name: string,
    description: string,
    icon: string,
}

export type CurrentStats = {
    users: UserStats,
    tweets: TweetStats,
}

export type StatsRegister = Record<string, Stat>;




export type TweetStats = {
    total_tweets: number,
    total_likes: number,
    total_retweets: number,
    total_replies: number,
}

export type UserStats = {
    total_followers: number,
    total_engagement: number,
    total_engagement_rate: string,
    average_engagement_rate: string,
}

export type Includes = {
    users: User[]
}

export type Meta = {

    newest_id: string,
    oldest_id: string,
    result_count: number,
    next_token?: string
}

export type TwitterApiResponseData = {
    data: Tweet[], 
    includes: Includes,
    meta: Meta

};