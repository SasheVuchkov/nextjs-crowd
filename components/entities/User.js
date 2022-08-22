"use strict";
exports.__esModule = true;
var react_bootstrap_1 = require("react-bootstrap");
var icons_1 = require("../../lib/icons");
var formatContent_1 = require("../../lib/utils/formatContent");
//TODO: Create components for the counters
function User(_a) {
    var data = _a.data;
    return (<react_bootstrap_1.Card key={data.id} className={"mb-4 shadow bg-nav"}>
            <react_bootstrap_1.Card.Header className="d-flex">
                <img src={data.profile_image_url} width={50} height={50} alt={"The avatar of ".concat(data.name)}/>
                <div className="user w-100 d-flex align-items-center justify-content-between">
                                            <span className="d-flex flex-column align-items-start ms-2">{data.name}
                                                <small className="focus-color">@{data.username}</small>
                                            </span>

                    <div className="d-flex">
                        <div>
                            {icons_1.follower}
                        </div>
                        <div>
                            {icons_1.heart}
                        </div>
                        <div>
                            {icons_1.retweet}
                        </div>
                        <div>
                            {icons_1.reply}
                        </div>
                    </div>

                </div>

            </react_bootstrap_1.Card.Header>
            <react_bootstrap_1.Card.Body style={{ minHeight: '80px' }}>
                <div dangerouslySetInnerHTML={{ __html: (0, formatContent_1.applyUserDescriptionEntities)(data.description, data) }}/>
            </react_bootstrap_1.Card.Body>
        </react_bootstrap_1.Card>);
}
exports["default"] = User;
