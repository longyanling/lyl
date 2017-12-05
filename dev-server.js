'use strict';

var config = require("./webpack.config.js");
var webpack = require('webpack');
var WebpackDevServer = require('webpack-dev-server');


config.entry.app.unshift("webpack-dev-server/client?http://localhost:8077/");

var apiProxy = {
	'/api/*': {
		target: 'http://dev.toysuperman.com/',
		secure: false,
        changeOrigin: true,
        pathRewrite: {
        	'/api/home/banner': '/home/banner',
			'/api/home/cities': '/home/cities',
			'/api/toy/list': '/toy/list',
			'/api/toy/info': '/toy/info',
			'/api/search/filter/list/v3': '/search/filter/list/v3',
			'/api/cart/list': '/cart/list',
			'/api/cart/checkAndAdd': '/cart/checkAndAdd',
			'/api/cart/clear': '/cart/clear',
			'/api/order/buy/check': '/order/buy/check',
			'/api/order/presubmit': '/order/presubmit',
			'/api/order/submit': '/order/submit',
			'/api/order/list/v2': '/order/list/v2',
			'/api/order/detail': '/order/detail',
			'/api/order/express/companies': '/order/express/companies',
			'/api/order/express/list': '/order/express/list',
			'/api/coupon/list': '/coupon/list',
			'/api/address/list': '/address/list',
			'/api/address/gd/insert': '/address/gd/insert',
			'/api/address/gd/update': '/address/gd/update',
			'/api/address/delete': '/address/delete',
			'/api/on/start': '/on/start',
			'/api/user/login': '/user/login',
			'/api/user/profile/jdv2': '/user/profile/jdv2',
			'/api/user/profile/update': '/user/profile/update'
        }
	}
};
var compiler = webpack(config);
var server = new WebpackDevServer(compiler, {
    publicPath: config.output.publicPath,
    hot: true,
    stats: { colors: true }, 
    proxy: apiProxy
});
server.listen(8077);