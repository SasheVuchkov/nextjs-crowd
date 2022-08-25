import {Card} from 'react-bootstrap';
import {heart, reply, retweet} from '../../lib/icons';
import {FormattedTweet} from '../../lib/types';
import {
    applyTweetEntities,
} from '../../lib/utils/formatContent';
import {CardStat} from '../stats/CardStat';
import Avatar from '../common/Avatar';

export type Props = {
    data: FormattedTweet,
    onClick?: () => void,
}

//TODO: Create components for the counters
export default function Tweet({data, onClick}: Props) {
    return (
        <Card key={data.id} className={`mb-4 shadow bg-nav`} onClick={onClick}>
            <Card.Header className="d-flex">
                <Avatar src={data.user?.profile_image_url} width={50} height={50} alt={`The avatar of ${data.user?.name}`} />
                <div className="user w-100 d-flex flex-column flex-lg-row align-items-start justify-content-between">
                    <span className="d-flex flex-row align-items-start flex-lg-column align-items-lg-start ms-2">
                        <span>{data.user?.name}</span>
                        <small className="focus-color position-relative ms-2 ms-lg-0" style={{top: '2px'}}>@{data.user?.username}</small>
                    </span>

                    <div className="d-flex ms-1 ms-lg-0">
                        <CardStat className="ms-3" stat={data.like_count} icon={heart} />
                        <CardStat className="ms-3" stat={data.retweet_count + data.quote_count} icon={retweet} />
                        <CardStat className="ms-3" stat={data.reply_count} icon={reply} />
                    </div>

                </div>

            </Card.Header>
            <Card.Body style={{minHeight: '80px'}}>
                <div dangerouslySetInnerHTML={{__html: applyTweetEntities(data.text, data)}} />
            </Card.Body>
        </Card>
    );
}