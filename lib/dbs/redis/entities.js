"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
exports.__esModule = true;
exports.EntityTweet = exports.EntityUser = void 0;
var redis_om_1 = require("redis-om");
var EntityUser = /** @class */ (function (_super) {
    __extends(EntityUser, _super);
    function EntityUser() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return EntityUser;
}(redis_om_1.Entity));
exports.EntityUser = EntityUser;
var EntityTweet = /** @class */ (function (_super) {
    __extends(EntityTweet, _super);
    function EntityTweet() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return EntityTweet;
}(redis_om_1.Entity));
exports.EntityTweet = EntityTweet;
