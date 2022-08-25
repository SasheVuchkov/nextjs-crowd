import React from 'react';
import {Card} from 'react-bootstrap';
import Avatar from '../common/Avatar';

export type Props = {
    data: {
      name: string,
      title: string,
      description: string,
      profile_image_url: string,
    },
    onClick?: () => void,
}

//TODO: Create components for the counters
export default function Creator({data, onClick}: Props) {
    return (
        <Card key={data.name} className={`mb-4 shadow bg-nav`} onClick={onClick}>
            <Card.Header className="d-flex">
                <Avatar src={data.profile_image_url} width={50} height={50} alt={`The avatar of ${data.name}`} />
                <div className="user w-100 d-flex flex-column flex-lg-row align-items-start justify-content-between">
                    <span className="d-flex flex-row align-items-start flex-lg-column align-items-lg-start ms-2">
                        <span>{data.name}</span>
                        <small className="focus-color position-relative ms-2 ms-lg-0" style={{top: '2px'}}>{data.title}</small>
                    </span>
                </div>

            </Card.Header>
            <Card.Body style={{minHeight: '80px'}}>
                <div dangerouslySetInnerHTML={{__html: data.description}} />
            </Card.Body>
        </Card>
    );
}