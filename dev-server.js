'use strict';

var config = require("./webpack.config.js");
var webpack = require('webpack');
var WebpackDevServer = require('webpack-dev-server');


config.entry.app.unshift("webpack-dev-server/client?http://localhost:8077/");

var apis = {
	'/home/list/v3' : '/home/list/v3',
	'/home/cities': '/home/cities',
	'/search/filter/list/v3': '/search/filter/list/v3',
	'/cart/list': '/cart/list',
	'/cart/checkAndAdd': '/cart/checkAndAdd',
	'/cart/clear': '/cart/clear',
	'/order/buy/check': '/order/buy/check',
	'/order/presubmit': '/order/presubmit',
	'/order/submit': '/order/submit',
	'/order/pay/jd': '/order/pay/jd',
	'/order/pay/check': '/order/pay/check',
	'/order/list/v2': '/order/list/v2',
	'/order/cancel': '/order/cancel',
	'/order/delete': '/order/delete',
	'/order/detail': '/order/detail',
	'/order/express/companies': '/order/express/companies',
	'/order/express/list': '/order/express/list',
	'/order/express/save': '/order/express/save',
	'/address/list': '/address/list',
	'/address/gd/insert': '/address/gd/insert',
	'/address/gd/update': '/address/gd/update',
	'/address/delete': '/address/delete',
	'/user/login': '/user/login',
	'/user/profile/jdv2': '/user/profile/jdv2',
	'/user/profile/update': '/user/profile/update',
	'/user/update/cityCode': '/user/update/cityCode',
	'/coupon/list': '/coupon/list',
	'/on/start': '/on/start'
}
var apiProxy = {
	'/home/*': {
		target: 'http://dev.toysuperman.com/',
		secure: false,
        changeOrigin: true
	},
	'/toy/*': {
		target: 'http://dev.toysuperman.com/',
		secure: false,
        changeOrigin: true
	},
	'/search/*': {
		target: 'http://dev.toysuperman.com/',
		secure: false,
        changeOrigin: true
	},
	'/cart/*': {
		target: 'http://dev.toysuperman.com/',
		secure: false,
        changeOrigin: true
	},
	'/order/*': {
		target: 'http://dev.toysuperman.com/',
		secure: false,
        changeOrigin: true
	},
	'/coupon/*': {
		target: 'http://dev.toysuperman.com/',
		secure: false,
        changeOrigin: true
	},
	'/address/*': {
		target: 'http://dev.toysuperman.com/',
		secure: false,
        changeOrigin: true
	},
	'/user/*': {
		target: 'http://dev.toysuperman.com/',
		secure: false,
        changeOrigin: true
	},
	'/on/*': {
		target: 'http://dev.toysuperman.com/',
		secure: false,
        changeOrigin: true
	}
};
var compiler = webpack(config);
var server = new WebpackDevServer(compiler, {
    publicPath: config.output.publicPath,
    stats: { colors: true },
    hot: true, 
    proxy: apiProxy
});
server.listen(8077);