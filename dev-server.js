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
        '/user/**' : {
            target: 'http://192.168.199.80:8080/',
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