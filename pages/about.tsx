import { NextPage } from 'next'
import Head from 'next/head'
import {Col, Row} from 'react-bootstrap';
import Banner from '../components/stats/Banner';
import Title from '../components/common/Title';
import Layout from '../components/common/Layout';
import {aboutStats} from '../lib/constants';
import Creator from '../components/entities/Creator';


const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>About - Next.Js Crowd</title>
        <meta name="description" content="This app was created exclusively for the #RedisHackathon on Dev.to. We used the following stack: Redis, Next.Js, React.Js, HTML, CSS3, TypeScript, JavaScript, Node.Js and Google Cloud Run." />
        <meta property="og:type"               content="page" />
        <meta property="og:title"              content="About - Next.Js Crowd" />
        <meta property="og:description"        content="This app was created exclusively for the #RedisHackathon on Dev.to. We used the following stack: Redis, Next.Js, React.Js, HTML, CSS3, TypeScript, JavaScript, Node.Js and Google Cloud Run." />
        <meta property="og:image"              content="https://nextjs.buhalbu.com/images/fb-about.jpg" />


       <meta name="twitter:card" content="summary_large_image" />
       <meta name="twitter:title" content="About - Next.Js Crowd" />
       <meta name="twitter:description" content="This app was created exclusively for the #RedisHackathon on Dev.to. We used the following stack: Redis, Next.Js, React.Js, HTML, CSS3, TypeScript, JavaScript, Node.Js and Google Cloud Run." />
       <meta name="twitter:image" content="https://nextjs.buhalbu.com/images/fb-about.jpg" />
      </Head>

        <Layout className="layout animation about">
            <Row className="gx-0">
                <Col lg={6} className="col-stats">
                    <Banner className="mt-5 mt-lg-0" title={<Title prefix="App" className="top-50 text-center">Stats</Title>} stats={aboutStats} />
                </Col>

                <Col lg={6} className="px-1 px-lg-3 mt-5 mt-lg-0">
                    <Title prefix="About" className="mt-4 animated-text text-center text-lg-start">Next.Js Crowd</Title>
                    <p className="animated-text mb-3 text-center text-lg-start">
                        This app was created exclusively for the {' '}
                        <a href="https://dev.to/devteam/announcing-the-redis-hackathon-on-dev-3248" target="_blank" rel="noreferrer">#RedisHackathon</a> on {' '}
                        <a href="https://dev.to" target="_blank" rel="noreferrer">Dev.to</a>. We used the following stack: Redis, Next.Js, React.Js, HTML, CSS3, TypeScript, JavaScript, Node.Js and Google Cloud Run.

                        <br /><br />Its creators are: </p>
                    
                    <Creator
                        onClick={() => {
                            window.open('https://www.linkedin.com/in/maureen-ononiwu/', '_blank');
                        }}
                        data={{name: 'Maureen Ononiwu', title: 'Back-end Developer', profile_image_url: '/images/maureen100x100.jpg', description: `Back-end and DevOps engineer with approximately 2 years of experience learning and mastering technologies, working independently as well as with teams building software solutions.`}}
                    />

                    <Creator
                        onClick={() => {
                            window.open('https://buhalbu.com/hire', '_blank');
                        }}
                        data={{name: 'Sashe Vuchkov', title: 'Full-stack Developer', profile_image_url: '/images/sashe100x100.jpg', description: `Bulgarian Blogger. Technical SEO Guy. JS & Next.Js Developer. React.Js Ninja, Rapid Learner. Creator of BuhalBu's Kit - It's All About Fast & Sleek Next.Js Apps`}}
                    />
          
                </Col>
            </Row>
        </Layout>
    </>
  )
}

export default Home