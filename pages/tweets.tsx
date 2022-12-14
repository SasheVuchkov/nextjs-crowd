import { NextPage } from 'next'
import Head from 'next/head'
import {Button, Col, Row} from 'react-bootstrap';

import {CurrentStats, FormattedTweet, FormattedUser, TweetStats} from '../lib/types';
import Banner from '../components/stats/Banner';
import Title from '../components/common/Title';
import Tweet from '../components/entities/Tweet';
import Layout from '../components/common/Layout';
import {getTweetUrl} from '../lib/utils/tweets';
import {statsInDB} from '../lib/utils/streamTweetsUtils/storeData';
import {fetchTweetsFromDB} from '../lib/utils/streamTweetsUtils/fetchRecords';
import {closeRedisConnection} from '../lib/dbs/redis/client';
import {useState} from 'react';
import LoadButton from '../components/common/LoadButton';
import {cacheControlValue} from '../lib/constants';

const Tweets: NextPage<{tweets: FormattedTweet[], stats: TweetStats}> = ({tweets, stats}) => {

    const [page, setPage] = useState<number|null>(1);
    const [pageTweets, setPageTweets] = useState<FormattedTweet[]>([...tweets]);
    const [loading, setLoading] = useState(false);

    const nextPage = () => {
        setLoading(true);

        fetch(`/api/tweets/${page}`).then(response => {
            setLoading(false);
            if (response.ok) {
                response.json().then(data => {
                    if (!data.tweets?.length) {
                        setPage(null);
                        return;
                    }

                    setPageTweets([...pageTweets, ...data.tweets]);
                    setPage(page + 1);

                }).catch(err => console.error(err));
            }
        }).catch(err => console.error(err));
    }

  return (
    <>
      <Head>
        <title>Top Tweets - Next.Js Crowd</title>
        <meta name="description" content="Our algorithm ranked these three tweets as the most prominent ones that mention the React.Js framework." />
        <meta property="og:type"               content="page" />
        <meta property="og:title"              content="Top Tweets - Next.Js Crowd" />
        <meta property="og:description"        content="Our algorithm ranked these three tweets as the most prominent ones that mention the React.Js framework." />
        <meta property="og:image"              content="https://nextjs.buhalbu.com/images/fb-top-users.jpg" />


        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Top Tweets - Next.Js Crowd" />
        <meta name="twitter:description" content="Our algorithm ranked these three tweets as the most prominent ones that mention the React.Js framework." />
        <meta name="twitter:image" content="https://nextjs.buhalbu.com/images/fb-top-tweets.jpg" />

      </Head>

        <Layout className={`layout animation tweets`}>
            <Row className="gx-0">
                <Col lg={6} className="col-stats">
                    <Banner className="mt-5 mt-lg-0" title={<Title prefix="Tweets" className="top-50 text-center">Stats <small className="d-block">(today)</small></Title>} stats={stats} />
                </Col>

                <Col lg={6} className="px-1 px-lg-3 mt-5 mt-lg-0">
                    <Title prefix="Top 3" className="mt-4 animated-text text-center text-lg-start">Tweets</Title>
                    <p className="animated-text mb-3 text-center text-lg-start">Our algorithm ranked these three tweets as the most prominent ones that mention the React.Js framework.</p>
                    {tweets && tweets.slice(0, 3).map(tweet => <Tweet key={tweet.id} data={tweet} onClick={() => {
                        window.open(getTweetUrl(tweet), 'blank');
                    }} />)}
                </Col>
            </Row>
            <Row className="gx-0">
                <Col lg={6} className="px-1 px-lg-3 mt-5 mb-4 offset-lg-3 text-center">
                    <Title prefix="All" className="mt-2 animated-text">Tweets</Title>
                    <p className="animated-text">Here is a list of all collected tweets that mention Next.Js, sorted by &quot;score&quot; - the sum of all likes, retweets, quotes and replies.</p>
                </Col>
            </Row>
            <Row className="gx-0">
                {pageTweets.map(tweet =>
                    <Col key={tweet.id} lg={6} className="px-1 px-lg-3">
                        <Tweet data={tweet} onClick={() => {
                            window.open(getTweetUrl(tweet), 'blank');
                        }} />
                    </Col>
                )}
            </Row>
            <Row className="gx-0">
                <Col lg={6} className="offset-lg-3 px-1 px-lg-3 animated-text">
                    <LoadButton loading={loading} page={page} onClick={nextPage}>
                        Load More
                    </LoadButton>
                </Col>
            </Row>
        </Layout>
    </>
  )
}

export default Tweets


export const getServerSideProps = async ({res}) => {
    res.setHeader('Cache-Control', cacheControlValue);

    const allStats = await statsInDB();
    const tweetStats: TweetStats = {
        total_tweets: allStats?.total_tweets || 0,
        total_likes: allStats?.total_likes || 0,
        total_replies: allStats?.total_replies || 0,
        total_retweets: allStats?.total_retweets || 0,
    }

    const tweets = await fetchTweetsFromDB(0, 15);
    await closeRedisConnection();

    return {props: {tweets: tweets, stats: tweetStats}};
}