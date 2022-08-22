"use strict";
exports.__esModule = true;
//Sashe Vuchkov: It can be better, should refactor it
function Title(_a) {
    var prefix = _a.prefix, suffix = _a.suffix, className = _a.className, children = _a.children;
    return (<h2 className={"h4 text-uppercase position-relative ".concat(className)}>
            {prefix && <span className="focus-color">{prefix}</span>}
            {' '}{children}{' '}
            {suffix && <span className="focus-color">{suffix}</span>}
        </h2>);
}
exports["default"] = Title;
