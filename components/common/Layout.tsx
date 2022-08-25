import React from 'react';
import Navbar from '../navs/Navbar';
import {Col, Container, Row} from 'react-bootstrap';
import Sidebar from '../navs/Sidebar';
import {CSSProperties, PropsWithChildren, useEffect, useRef} from 'react';

export type Props = {
    className?: string,
    style?: CSSProperties,
}

export default function Layout({children, className, style}: PropsWithChildren<Props>) {
    const wrapperRef = useRef<HTMLDivElement>(null);

    //Sashe Vuchkov: Maybe we don't need that anymore
    const triggerAnimations = () => {
        if (wrapperRef.current) {
            wrapperRef.current.className = wrapperRef.current.className.indexOf('animation') < 0 ? `${wrapperRef.current.className} animation` : wrapperRef.current.className.replace('animation', '');
        }
    }

    useEffect(() => {
        if (!document.body.className.includes('js-not-first') && wrapperRef.current && wrapperRef.current.className.indexOf('animation') > -1) {
            document.body.className = `${document.body.className} js-not-first`;
            wrapperRef.current.className =  wrapperRef.current.className.replace('animation', '');
        }
    }, []);


    return (<div id="layout" ref={wrapperRef} className={className} style={style}>
        <Navbar />
        <Container fluid className="gx-0">
            <Row className="gx-0">
                <Col lg={2} className="d-none d-lg-block sidebar shadow ps-4">
                    <Sidebar />
                </Col>

                <Col lg={10} className="pb-3">
                    {children}
                </Col>
            </Row>
        </Container>
        <footer className="d-block d-lg-none">
            <Container>
                Copyrights &copy; {new Date().getFullYear()} All rights reserved. <br />Created by <a href="https://www.linkedin.com/in/maureen-ononiwu/">Maureen Ononiwu</a> & <a href="https://buhalbu.com">Sashe Vuchkov</a>
            </Container>
        </footer>
    </div>);
}