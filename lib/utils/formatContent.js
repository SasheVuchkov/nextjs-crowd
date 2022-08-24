"use strict";
exports.__esModule = true;
exports.applyUserDescriptionEntities = exports.formatContent = exports.colorHashtags = exports.colorMentions = void 0;
var colorMentions = function (html) {
    var hashtags = new RegExp('(@[^    ,.:;!?]+)', 'ig').exec(html);
    console.log(hashtags, 'mentions');
    return html;
};
exports.colorMentions = colorMentions;
var colorHashtags = function (html) {
    var hashtags = new RegExp('(#[^    ]+)', 'ig').exec(html);
    console.log(hashtags, 'hashtags');
    return html;
};
exports.colorHashtags = colorHashtags;
var formatContent = function (html) {
    (0, exports.colorHashtags)((0, exports.colorMentions)(html));
    return html;
};
exports.formatContent = formatContent;
var applyUserDescriptionEntities = function (html, user) {
    if (!user.entities) {
        return html;
    }
    var entities = user.entities;
    if (typeof entities === 'string') {
        entities = JSON.parse(user.entities);
    }
    if (!entities.description) {
        return html;
    }
    ['urls', 'hashtags', 'mentions'].forEach(function (entity) {
        if (typeof entities[entity] === 'undefined') {
            return;
        }
        entities.description[entity].forEach(function (ent) {
            if (entity === 'hashtags') {
                console.log("replaced hashtag ".concat(ent.tag));
                html = html.replace("#".concat(ent.tag), "<span class=\"focus-color\">#".concat(ent.tag, "</span>"));
            }
            if (entity === 'mentions') {
                html = html.replace("@".concat(ent.username), "<span class=\"focus-color\">@".concat(ent.username, "</span>"));
            }
            if (entity === 'urls') {
                html = html.replace("".concat(ent.url), "<span class=\"focus-color\">".concat(ent.display_url, "</span>"));
            }
        });
    });
    return html;
};
exports.applyUserDescriptionEntities = applyUserDescriptionEntities;
