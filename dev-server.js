'use strict';

var config = require("./webpack.config.js");
var webpack = require('webpack');
var WebpackDevServer = require('webpack-dev-server');


config.entry.app.unshift("webpack-dev-server/client?http://localhost:8077/");
var compiler = webpack(config);
var server = new WebpackDevServer(compiler, {
    publicPath: config.output.publicPath,
    hot: true, 
    proxy: {
        '/user/profile/jdv2' : {
            target: 'http://dev.toysuperman.com/',
            secure: false,
            changeOrigin: true
        },
        '/user/profile' : {
            target: 'http://dev.toysuperman.com/',
            secure: false,
            changeOrigin: true
        },
        '/user/profile/update' : {
            target: 'http://dev.toysuperman.com/',
            secure: false,
            changeOrigin: true
        },
        '/user/login' : {
            target: 'http://dev.toysuperman.com/',
            secure: false,
            changeOrigin: true
        },
        '/coupon/**': {
            target: 'http://dev.toysuperman.com/',
            secure: false,
            changeOrigin: true
        },
        '/home/**': {
            target: 'http://dev.toysuperman.com/',
            secure: false,
            changeOrigin: true
        },
        '/toy/**': {
            target: 'http://dev.toysuperman.com/',
            secure: false,
            changeOrigin: true
        },
        '/cart/**': {
            target: 'http://dev.toysuperman.com/',
            secure: false,
            changeOrigin: true
        },
        '/order/**': {
            target: 'http://dev.toysuperman.com/',
            secure: false,
            changeOrigin: true
        },
        '/search/**': {
            target: 'http://dev.toysuperman.com/',
            secure: false,
            changeOrigin: true
        },
        '/address/**': {
            target: 'http://dev.toysuperman.com/',
            secure: false,
            changeOrigin: true
        },
    },
    stats: {
        colors: true
    }
});
server.listen(8077);