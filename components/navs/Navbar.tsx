import React from 'react';
import {Container, Nav, Navbar as NavbarBase} from 'react-bootstrap';
import Link from './Link';
import {coffee, edit, follower, linkedin} from '../../lib/icons';

//TODO: Sashe Vuchkov: Align it with the sidebar
export default function Navbar() {
    return (
        <NavbarBase expand="lg" fixed="top" variant="dark" className="d-block d-lg-none bg-nav">
            <Container>
                <NavbarBase.Brand >
                    <span className="focus-color">Next.Js</span> Crowd
                </NavbarBase.Brand>
                <NavbarBase.Toggle aria-controls="responsive-navbar-nav" />
                <NavbarBase.Collapse id="responsive-navbar-nav">
                    <Nav className="me-auto">
                        <Link className="nav-link" href="/" icon={follower}>Top Users</Link>
                        <Link className="nav-link" href="/tweets" icon={edit}>Top Tweets</Link>

                        <Link className="nav-link" href="/about" icon={coffee}>About</Link>

                        <Link className="nav-link" href="https://www.linkedin.com/in/maureen-ononiwu/" icon={linkedin}>Maureen</Link>
                        <Link className="nav-link" href="https://www.linkedin.com/in/sashe-vuchkov-6a5b18aa/" icon={linkedin}>Sashe</Link>
                    </Nav>
                </NavbarBase.Collapse>
            </Container>
        </NavbarBase>
    );
}