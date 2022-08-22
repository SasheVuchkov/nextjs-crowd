"use strict";
exports.__esModule = true;
var link_1 = require("next/link");
function Link(_a) {
    var href = _a.href, icon = _a.icon, children = _a.children;
    return (<link_1["default"] href={href} passHref={true}>
            <a className="d-flex">
                {icon}
                <span className="ms-2">{children}</span>
            </a>
        </link_1["default"]>);
}
exports["default"] = Link;
