"use strict";
exports.__esModule = true;
var Navbar_1 = require("../navs/Navbar");
var react_bootstrap_1 = require("react-bootstrap");
var Sidebar_1 = require("../navs/Sidebar");
var react_1 = require("react");
function Layout(_a) {
    var children = _a.children, className = _a.className, style = _a.style;
    var wrapperRef = (0, react_1.useRef)(null);
    //Sashe Vuchkov: Maybe we don't need that anymore
    var triggerAnimations = function () {
        if (wrapperRef.current) {
            wrapperRef.current.className = wrapperRef.current.className.indexOf('animation') < 0 ? "".concat(wrapperRef.current.className, " animation") : wrapperRef.current.className.replace('animation', '');
        }
    };
    (0, react_1.useEffect)(function () {
        if (!document.body.className.includes('js-not-first') && wrapperRef.current && wrapperRef.current.className.indexOf('animation') > -1) {
            document.body.className = "".concat(document.body.className, " js-not-first");
            wrapperRef.current.className = wrapperRef.current.className.replace('animation', '');
        }
    }, []);
    return (<div id="layout" ref={wrapperRef} className={className} style={style}>
        <Navbar_1["default"] />
        <react_bootstrap_1.Container fluid className="gx-0">
            <react_bootstrap_1.Row className="gx-0">
                <react_bootstrap_1.Col lg={2} className="d-none d-lg-block sidebar shadow ps-4">
                    <Sidebar_1["default"] />
                </react_bootstrap_1.Col>

                <react_bootstrap_1.Col lg={10} className="pb-3">
                    {children}
                </react_bootstrap_1.Col>
            </react_bootstrap_1.Row>
        </react_bootstrap_1.Container>
        <footer className="d-block d-lg-none">
            <react_bootstrap_1.Container>
                Copyrights &copy; {new Date().getFullYear()} All rights reserved. <br />Created by <a href="https://www.linkedin.com/in/maureen-ononiwu/">Maureen Ononiwu</a> & <a href="https://buhalbu.com">Sashe Vuchkov</a>
            </react_bootstrap_1.Container>
        </footer>
    </div>);
}
exports["default"] = Layout;
