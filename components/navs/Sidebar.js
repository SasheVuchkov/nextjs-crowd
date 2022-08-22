"use strict";
exports.__esModule = true;
var react_bootstrap_1 = require("react-bootstrap");
var Link_1 = require("./Link");
var icons_1 = require("../../lib/icons");
function Sidebar() {
    return (<div className="position-fixed">
            <div className="h4 my-2">Next.Js <span className="focus-color">Crowd</span></div>
            <react_bootstrap_1.Nav className="flex-column justify-content-center mt-4" style={{ minHeight: '70vh' }}>
                <react_bootstrap_1.Nav.Item className="mb-3">
                    <Link_1["default"] href="/" icon={icons_1.follower}>
                        Top Users
                    </Link_1["default"]>
                </react_bootstrap_1.Nav.Item>
                <react_bootstrap_1.Nav.Item className="mb-3">
                    <Link_1["default"] href="/tweets" icon={icons_1.edit}>
                        Top Tweets
                    </Link_1["default"]>
                </react_bootstrap_1.Nav.Item>
                <react_bootstrap_1.Nav.Item className="mb-3">
                    <Link_1["default"] href="/" icon={icons_1.barChart}>
                        More Stats
                    </Link_1["default"]>
                </react_bootstrap_1.Nav.Item>
            </react_bootstrap_1.Nav>
            <div className="text-center position-fixed bottom-0 mb-3" style={{ width: '200px', fontSize: '0.8rem' }}>
                Copyrights &copy; {new Date().getFullYear()} <br />Created by <a href="https://www.linkedin.com/in/maureen-ononiwu/">Maureen Ononiwu</a> & <a href="https://buhalbu.com">Sashe Vuchkov</a>
            </div>
        </div>);
}
exports["default"] = Sidebar;
