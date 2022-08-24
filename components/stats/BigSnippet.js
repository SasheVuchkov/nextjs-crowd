"use strict";
exports.__esModule = true;
var react_1 = require("react");
function BigSnippet(_a) {
    var title = _a.title, children = _a.children, className = _a.className;
    return (<div className={"big-snippet my-4 p-3 ".concat(className)}>
        <h1 className="display-4 text-white m-0">
            {children}
        </h1>
        <span className="d-block text-white text-center h4 text-capitalize">{title}</span>
    </div>);
}
exports["default"] = BigSnippet;
