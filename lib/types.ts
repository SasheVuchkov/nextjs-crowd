
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
    entities: string


}

export type FormattedTweet = {
    id: string,
    author_id: string,
    text: string,
    created_at: string,
    score: number,
    entities: string,
    retweet_count: number, 
    reply_count: number, 
    like_count: number, 
    quote_count: number,
    user: FormattedUser| null
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
    entities: string,
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
    followers_count: number,
    following_count: number,
    tweet_count: number,
    listed_count: number,
    entities: string
    tweets: Tweet[]
}

export type FormattedStats = {
    total_tweets: number;
    total_likes: number;
    total_retweets: number;
    total_replies: number;
    total_users: number;
    total_followers: number;
    total_engagement: number;
    total_engagement_rate: string;
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

export type AboutStats = {
    invested_hours: number,
    developers_num: number,
    code_lines: number,
    tech_used: number,
}

export type TweetStats = {
    total_tweets: number,
    total_likes: number,
    total_retweets: number,
    total_replies: number,
}

export type UserStats = {
    total_users: number,
    total_followers: number,
    total_engagement: number,
    total_engagement_rate: string,
}

export type Includes = {
    users: User[]
}

export type Meta = {

    newest_id: string,
    oldest_id: string,
    result_count: number,
    next_token: string| null
}

export type TwitterApiResponseData = {
    data: Tweet[], 
    includes: Includes,
    meta: Meta

};