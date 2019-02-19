var path = require('path')
var webpack = require ('webpack')
var ExtractTextPlugin = require('extract-text-webpack-plugin')
module.exports = {
    entry: {
        build: './src/main.js'
    },
    output: {
        path: path.resolve(__dirname, '../dist'),
        chunkFilename: '[name].js',
        filename: '[name].js'
    },
    module: {
        rules: [
            {
                test: /\.js/,
                loader: 'babel-loader',
                exclude: /node_modules/
            },
            {
                test: /\.css$/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: [
                        {
                            loader: 'css-loader',
                            options: {
                                importLoaders: 1,
                            }
                        },
                        {
                            loader: 'postcss-loader'
                        }
                    ],
                    publicPath: path.resolve(__dirname, './dist')
                })
            }
        ]
    },
    resolve: {
        alias: {
            'vue$': 'vue/dist/vue.esm.js',   // 加载哪个vue构建方式, 基于 ES Module 的完整构建,带 template 编译
        }
    },
    devServer: {
        port: '8081',
        disableHostCheck: true
    }
}