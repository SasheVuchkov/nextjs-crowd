"use strict";
exports.__esModule = true;
var react_1 = require("react");
//Sashe Vuchkov: Maybe we don't need the description prop at all
function Snippet(_a) {
    var children = _a.children, title = _a.title, description = _a.description, className = _a.className, style = _a.style;
    return (<div className="standard-snippet mb-4 d-flex align-items-center justify-content-center" style={style}>
            <div className={"d-flex flex-column justify-content-center align-items-center ".concat(className)}>
                <div className="data-point display-3 text-white m-0">
                    {children}
                </div>
                <div className="content text-center">
                    <span className="d-block text-white h6 m-0">{title}</span>
                </div>
            </div>
        </div>);
}
exports["default"] = Snippet;
