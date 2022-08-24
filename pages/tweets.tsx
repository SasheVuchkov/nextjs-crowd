import { NextPage } from 'next'
import Head from 'next/head'
import {Button, Col, Row} from 'react-bootstrap';

import {CurrentStats, TwitterApiResponseData} from '../lib/types';
import Banner from '../components/stats/Banner';
import Title from '../components/common/Title';
import Tweet from '../components/entities/Tweet';
import Layout from '../components/common/Layout';
import {getRecentTweets} from '../lib/repos/tweets';
import {calcBatchTweetStats, calcBatchUserStats} from '../lib/utils/stats';
import {getTweetUrl} from '../lib/utils/tweets';

const Home: NextPage<any & {stats: CurrentStats}> = ({tweets, stats}) => {
  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

        <Layout className={`layout animation tweets`}>
            <Row className="gx-0">
                <Col lg={6} className="col-stats">
                    <Banner className="mt-5 mt-lg-0" title={<Title prefix="Tweets" className="top-50 text-center">Stats</Title>} stats={stats.tweets} />
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
                    <p className="animated-text">Here is a list of all collected tweets that mention Next.Js, sorted by "score" - the sum of all likes, retweets, quotes and replies.</p>
                </Col>
            </Row>
            <Row className="gx-0">
                {tweets && tweets.slice(0, 10).map(tweet =>
                    <Col key={tweet.id} lg={6} className="px-1 px-lg-3">
                        <Tweet data={tweet} onClick={() => {
                            window.open(getTweetUrl(tweet), 'blank');
                        }} />
                    </Col>
                )}
            </Row>
            <Row className="gx-0">
                <Col lg={6} className="offset-lg-3 px-1 px-lg-3 animated-text">
                    <Button variant="outline-light" className="w-100 load-more" >Load More</Button>
                </Col>
            </Row>
        </Layout>
    </>
  )
}

export default Home


export const getServerSideProps = async () => {
    const data = await getRecentTweets();

    const tweetStats = calcBatchTweetStats(data.tweets);
    const currentStats: CurrentStats = {
        tweets: tweetStats,
        users: calcBatchUserStats(data.users, tweetStats),
    }

    return {props: {users: data.users, tweets: data.tweets, stats: currentStats}};
}