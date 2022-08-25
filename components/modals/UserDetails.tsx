import React, {useEffect, useRef, useState} from 'react';
import {CloseButton, Modal, Spinner} from 'react-bootstrap';
import Tweet from '../entities/Tweet';
import {FormattedTweet, FormattedUser, User} from '../../lib/types';
import {getTweetUrl, getTwitterProfileUrl} from '../../lib/utils/tweets';

export type Props = {
    user: FormattedUser;
    onClose: () => void;
}

export default function UserDetails({user, onClose}: Props) {
    const headerRef = useRef<HTMLDivElement|null>(null);
    const bodyRef = useRef<HTMLDivElement|null>(null);

    const [ownTweets, setOwnTweets] = useState<FormattedTweet[]|null>(null);

    useEffect(() => {
        setOwnTweets(null);

        fetch(`/api/tweets/user/${user.id}`).then(response => {
            if (response.ok) {
                response.json().then(data => {
                    const tweets = data.tweets.map(tweet => ({...tweet, user: user}));
                    setOwnTweets(tweets);
                }).catch(err => console.error(err));
            }
        }).catch(err => console.error(err));

        if (!headerRef.current || !window || ! (window as any).twemoji) {
            return;
        }

        (window as any).twemoji.parse(headerRef.current);
        (window as any).twemoji.parse(bodyRef.current);
    }, [user.id]);

    return (
            <Modal show={true} size="lg" contentClassName="user-details" onHide={onClose} >
                <Modal.Header ref={headerRef}>
                    <div className="d-flex">
                        <img src={user.profile_image_url} style={{borderRadius: '50%'}} />
                        <div className="ms-2 d-flex flex-column">
                            <span className="h6 mb-0"><span>{user.name}</span>'s Tweets</span>
                            <a href={getTwitterProfileUrl(user)} className="focus-color"><small>Open profile in Twitter</small></a>
                        </div>
                    </div>
                    <CloseButton variant="white" onClick={onClose} />
                </Modal.Header>
                <Modal.Body ref={bodyRef}>
                    {ownTweets && ownTweets.map(tweet => <Tweet key={tweet.id} data={tweet} onClick={() => window.open(getTweetUrl(tweet), '_blank')}  />)}
                    {ownTweets && ownTweets.length < 1 && <div>Can't find any tweets...</div>}
                    {!ownTweets && <div><Spinner animation={'grow'} size="sm" /> Loading...</div>}
                </Modal.Body>
            </Modal>
    );
}