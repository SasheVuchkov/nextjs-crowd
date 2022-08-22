"use strict";
exports.__esModule = true;
exports.memoryCache = exports.makeKeyHash = void 0;
var cache_manager_1 = require("cache-manager");
var jshashes_1 = require("jshashes");
exports.makeKeyHash = (new jshashes_1["default"].MD5).hex;
exports.memoryCache = cache_manager_1["default"].caching({ store: 'memory', ttl: 60 * 60 });
