import {Card} from 'react-bootstrap';
import {follower, heart, reply, retweet} from '../../lib/icons';
import {User as UserEntity} from '../../lib/types';
import {applyUserDescriptionEntities, colorMentions, formatContent} from '../../lib/utils/formatContent';

export type Props = {
    data: UserEntity
}

//TODO: Create components for the counters
export default function User({data}: Props) {
    return (
        <Card key={data.id} className={`mb-4 shadow bg-nav`}>
            <Card.Header className="d-flex">
                <img src={data.profile_image_url} width={50} height={50} alt={`The avatar of ${data.name}`} />
                <div className="user w-100 d-flex align-items-center justify-content-between">
                                            <span className="d-flex flex-column align-items-start ms-2">{data.name}
                                                <small className="focus-color">@{data.username}</small>
                                            </span>

                    <div className="d-flex">
                        <div>
                            {follower}
                        </div>
                        <div>
                            {heart}
                        </div>
                        <div>
                            {retweet}
                        </div>
                        <div>
                            {reply}
                        </div>
                    </div>

                </div>

            </Card.Header>
            <Card.Body style={{minHeight: '80px'}}>
                <div dangerouslySetInnerHTML={{__html: applyUserDescriptionEntities(data.description, data)}} />
            </Card.Body>
        </Card>
    );
}