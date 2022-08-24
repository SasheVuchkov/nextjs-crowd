"use strict";
exports.__esModule = true;
var react_1 = require("react");
var Snippet_1 = require("./Snippet");
var constants_1 = require("../../lib/constants");
function Banner(_a) {
    var title = _a.title, stats = _a.stats;
    return (<div className="banner">
            {title}
            <div className="mt-2 d-flex flex-wrap justify-content-between align-items-center w-100">
                {Object.entries(stats).map(function (entry) {
            return <Snippet_1["default"] style={{ width: '35%' }} key={entry[0]} title={constants_1.statsRegister[entry[0]].name} description={constants_1.statsRegister[entry[0]].description}>
                        {entry[1]}
                    </Snippet_1["default"]>;
        })}
            </div>
        </div>);
}
exports["default"] = Banner;
