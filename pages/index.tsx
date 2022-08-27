import { NextPage } from 'next'
import Head from 'next/head'
import {Button, CloseButton, Col, Modal, Row, Spinner} from 'react-bootstrap';
import {CurrentStats, FormattedUser, UserStats} from '../lib/types';
import Banner from '../components/stats/Banner';
import Title from '../components/common/Title';
import User from '../components/entities/User';
import Layout from '../components/common/Layout';
import {useState} from 'react';
import UserDetails from '../components/modals/UserDetails';
import {statsInDB} from '../lib/utils/streamTweetsUtils/storeData';
import {fetchUsersFromDB} from '../lib/utils/streamTweetsUtils/fetchRecords';
import {closeRedisConnection} from '../lib/dbs/redis/client';
import LoadButton from '../components/common/LoadButton';
import {cacheControlValue} from '../lib/constants';

const Home: NextPage<{ users: FormattedUser[] } & {stats: UserStats}> = ({users, stats}) => {
    const [selectedUser, setSelectedUser] = useState<FormattedUser|null>(null);
    const [page, setPage] = useState<number|null>(1);
    const [pageUsers, setPageUsers] = useState<FormattedUser[]>([...users]);
    const [loading, setLoading] = useState(false);

    const nextPage = () => {
        setLoading(true);

        fetch(`/api/users/${page}`).then(response => {
            setLoading(false);
            if (response.ok) {
                response.json().then(data => {
                    if (!data.users?.length) {
                        setPage(null);
                        return;
                    }

                    setPageUsers([...pageUsers, ...data.users]);
                    setPage(page + 1);

                }).catch(err => console.error(err));
            }
        }).catch(err => console.error(err));
    }

    return (
    <>
      <Head>
        <title>Top Users - Next.Js Crowd</title>
        <meta name="description" content="Our algorithm ranked these three users as the most prominent ones now who mentioned the React.Js framework Next.js." />
        <meta property="og:type"               content="page" />
        <meta property="og:title"              content="Top Users - Next.Js Crowd" />
        <meta property="og:description"        content="Our algorithm ranked these three users as the most prominent ones now who mentioned the React.Js framework Next.js." />
        <meta property="og:image"              content="https://nextjs.buhalbu.com/images/fb-top-users.jpg" />


        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Top Users - Next.Js Crowd" />
        <meta name="twitter:description" content="Our algorithm ranked these three users as the most prominent ones now who mentioned the React.Js framework Next.js." />
        <meta name="twitter:image" content="https://nextjs.buhalbu.com/images/fb-top-users.jpg" />
      </Head>
        <Layout className="layout index animation">
            {selectedUser && <UserDetails user={selectedUser} onClose={() => {
                setSelectedUser(null);
            }} />}
            <Row className="gx-0">
                <Col lg={6} className="col-stats">
                    <Banner className="mt-5 mt-lg-0" title={<Title prefix="Users" className="top-50 text-center">Stats<small className="d-block">(today)</small></Title>} stats={stats} />
                </Col>

                <Col lg={6} className="px-3 mt-5 mt-lg-0">
                    <Title prefix="Top 3" className="mt-4 animated-text text-center text-lg-start">Users</Title>
                    <p className="animated-text mb-3 text-center text-lg-start">Our algorithm ranked these three users as the most prominent ones now who mentioned the React.Js framework Next.js.</p>
                    {users && users.slice(0, 3).map(user => <User key={user.id} data={user} onClick={() => setSelectedUser(user)} />)}
                </Col>
            </Row>
            <Row className="gx-0">
                <Col lg={6} className="px-1 px-lg-3 mt-5 mb-4 offset-lg-3 text-center">
                    <Title prefix="All" className="mt-2 animated-text">Users</Title>
                    <p className="animated-text">Here is a list of all users who talked about Next.Js today</p>
                </Col>
            </Row>
            <Row className="gx-0">
                {pageUsers.map(user =>
                    <Col key={user.id} lg={6} className="px-1 px-lg-3">
                        <User data={user} onClick={() => {
                            setSelectedUser(user)
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

export default Home


export const getServerSideProps = async ({res}) => {
    res.setHeader('Cache-Control', cacheControlValue);

    const allStats = await statsInDB();
    const stats: UserStats = {
        total_users: allStats?.total_users || 0,
        total_followers: allStats?.total_followers || 0,
        total_engagement: allStats?.total_engagement || 0,
        total_engagement_rate: allStats?.total_engagement_rate || '0%',
    }

    const users = await fetchUsersFromDB(0, 15);

    return {props: {users: users, stats: stats}};
}