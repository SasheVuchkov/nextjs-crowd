"use strict";
exports.__esModule = true;
require("bootstrap/dist/css/bootstrap.css");
require("../styles/globals.css");
var react_bootstrap_1 = require("react-bootstrap");
var javascript_time_ago_1 = require("javascript-time-ago");
var en_1 = require("javascript-time-ago/locale/en");
var router_1 = require("next/router");
var nprogress_1 = require("nprogress");
require("nprogress/nprogress.css");
javascript_time_ago_1["default"].addDefaultLocale(en_1["default"]);
//Binding events.
router_1.Router.events.on('routeChangeStart', function () {
    nprogress_1["default"].start();
    if (typeof document !== 'undefined') {
        var layout = document.getElementById('layout');
        if (layout) {
            layout.className += ' animation';
            window.location.href = window.location.href.indexOf('#') < 0 ? "".concat(window.location.href, "#top") : window.location.href;
        }
    }
});
router_1.Router.events.on('routeChangeComplete', function () {
    nprogress_1["default"].done();
    if (typeof document !== 'undefined') {
        var layout = document.getElementById('layout');
        if (layout) {
            layout.className = layout.className.replaceAll('animation', '');
        }
    }
});
router_1.Router.events.on('routeChangeError', function () { return nprogress_1["default"].done(); });
function MyApp(_a) {
    var Component = _a.Component, pageProps = _a.pageProps;
    return <react_bootstrap_1.SSRProvider>
    <Component {...pageProps}/>
  </react_bootstrap_1.SSRProvider>;
}
exports["default"] = MyApp;
