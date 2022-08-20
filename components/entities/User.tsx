import {Card} from 'react-bootstrap';
import {follower, heart, reply, retweet} from '../../lib/icons';
import {User as UserEntity} from '../../lib/types';
import {applyUserDescriptionEntities, colorMentions, formatContent} from '../../lib/utils/formatContent';
import {CardStat} from '../stats/CardStat';
import Avatar from '../common/Avatar';

export type Props = {
    data: UserEntity,
    onClick?: () => void,
}

//TODO: Create components for the counters
export default function User({data, onClick}: Props) {
    return (
        <Card key={data.id} className={`mb-4 shadow bg-nav`} onClick={onClick}>
            <Card.Header className="d-flex">
                <Avatar src={data.profile_image_url} width={50} height={50} alt={`The avatar of ${data.name}`} />
                <div className="user w-100 d-flex flex-column flex-lg-row align-items-start justify-content-between">
                    <span className="d-flex flex-row align-items-start flex-lg-column align-items-lg-start ms-2">
                        <span>{data.name}</span>
                        <small className="focus-color position-relative ms-2 ms-lg-0" style={{top: '2px'}}>@{data.username}</small>
                    </span>

                    <div className="d-flex ms-1 ms-lg-0">
                        <CardStat stat={data.public_metrics.followers_count} icon={follower} />
                        <CardStat className="ms-3" stat={0} icon={heart} />
                        <CardStat className="ms-3" stat={0} icon={retweet} />
                        <CardStat className="ms-3" stat={0} icon={reply} />
                    </div>

                </div>

            </Card.Header>
            <Card.Body style={{minHeight: '80px'}}>
                <div dangerouslySetInnerHTML={{__html: applyUserDescriptionEntities(data.description, data)}} />
            </Card.Body>
        </Card>
    );
}