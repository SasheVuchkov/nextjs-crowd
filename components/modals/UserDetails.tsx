import React, {useEffect, useRef} from 'react';
import {CloseButton, Modal} from 'react-bootstrap';
import Tweet from '../entities/Tweet';
import {User} from '../../lib/types';
import {getTwitterProfileUrl} from '../../lib/utils/tweets';

export type Props = {
    user: User;
    onClose: () => void;
}

export default function UserDetails({user, onClose}: Props) {
    const headerRef = useRef<HTMLDivElement|null>(null);
    const bodyRef = useRef<HTMLDivElement|null>(null);

    useEffect(() => {
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
                    {user.tweets && user.tweets.map(tweet => <Tweet key={tweet.id} data={tweet}  />)}
                </Modal.Body>
            </Modal>
    );
}