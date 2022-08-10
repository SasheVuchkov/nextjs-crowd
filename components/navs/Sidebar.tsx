import {Nav} from 'react-bootstrap';
import Link from './Link';
import {barChart, edit, follower} from '../../lib/icons';

export default function Sidebar() {
    return (
        <div className="position-fixed">
            <div className="h4 my-2">Next.Js <span className="focus-color">Crowd</span></div>
            <Nav className="flex-column justify-content-center mt-4" style={{minHeight: '70vh'}}>
                <Nav.Item className="mb-3">
                    <Link href="/" icon={follower}>
                        Top Users
                    </Link>
                </Nav.Item>
                <Nav.Item className="mb-3">
                    <Link href="/tweets" icon={edit}>
                        Top Tweets
                    </Link>
                </Nav.Item>
                <Nav.Item className="mb-3">
                    <Link href="/" icon={barChart}>
                        More Stats
                    </Link>
                </Nav.Item>
            </Nav>
            <div className="text-center position-fixed bottom-0 mb-3">
                Copyrights &copy; {new Date().getFullYear()} <br />Created by <a href="https://buhalbu.com">Sashe Vuchkov</a>
            </div>
        </div>
    );
}