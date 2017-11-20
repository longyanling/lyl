var webpack = require('webpack');

module.exports = {
    devtool: 'cheap-source-map',
    entry:{
        app:[ './src/main.js' ]
    },
    output:{
        path: __dirname,
        publicPath: '/',
        filename: 'dist/bundle.js'
    },
    module:{
        rules:[
            {
                test: /\.vue$/,
                loader: 'vue-loader',
                options: {
                    loaders: {
                        'scss': 'style-loader!css-loader!sass-loader'
                    }
                }
            },
            {
                test: /\.js$/,
                loader: 'babel-loader'
            },
            {
                test: /\.(css|scss)$/,
                loader: 'vue-style-loader!css-loader!sass-loader'
            },
            {
                test: /\.(png|jpg|gif)$/,
                loader:'url-loader',
                options: {
                    limit: 4192,
                    name: './dist/img/[name].[hash:7].[ext]'
                }
            }
        ]
    },
     
    resolve:{
        extensions:[' ','.css','.js','vue'],
        alias: { 
            '@': __dirname + '/src',
            'vue': 'vue/dist/vue.js' 
        }
    },
    plugins: [
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            }
        })
    ]
}