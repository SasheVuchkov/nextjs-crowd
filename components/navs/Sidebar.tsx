import {Nav} from 'react-bootstrap';
import Link from './Link';
import {barChart, coffee, edit, follower, linkedin} from '../../lib/icons';

export default function Sidebar() {
    return (
        <div className="position-fixed">
            <div className="h4 my-4">Next.Js <span className="focus-color">Crowd</span></div>
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

                <Nav.Item className="my-4">
                    <Link href="/about" icon={coffee}>
                        About
                    </Link>
                </Nav.Item>

                <Nav.Item className="mb-3 mt-3">
                    <Link href="https://www.linkedin.com/in/maureen-ononiwu/" icon={linkedin}>
                        Maureen
                    </Link>
                </Nav.Item>
                <Nav.Item className="mb-3">
                    <Link href="https://www.linkedin.com/in/sashe-vuchkov-6a5b18aa/" icon={linkedin}>
                        Sashe
                    </Link>
                </Nav.Item>
            </Nav>
            <div className="text-center position-fixed bottom-0 mb-3" style={{width: '200px', fontSize: '0.8rem'}}>
                Copyrights &copy; {new Date().getFullYear()} <br />Created by <a href="https://www.linkedin.com/in/maureen-ononiwu/">Maureen Ononiwu</a> & <a href="https://buhalbu.com">Sashe Vuchkov</a>
            </div>
        </div>
    );
}