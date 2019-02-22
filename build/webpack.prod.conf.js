const merge = require('webpack-merge')
const webpack = require('webpack')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const baseWebpackConfig = require('./webpack.base.conf.js')

module.exports = merge(baseWebpackConfig,{
    output: {
        // publicPath: 'http://192.168.1.26:8081/xingyuan/mobile/dist/',  //输出时，使用的基路径,若项目不是在域名根目录时生产时需改为  ./dist/
        publicPath: 'http://zqjtjx.yukedaonline.com/zqjtjx/mobile/index.html'
    },
    module:{
        rules: [
            {
                test: /\.scss$/,
                use: ExtractTextPlugin.extract({
                    use: [{
                        loader: "css-loader"
                    }, {
                        loader: "sass-loader"
                    }],
                    // 在开发环境使用 style-loader
                    fallback: "style-loader"
                })
            },
            {
                test: /\.(png|jpg|gif|svg)$/,
                loader: 'url-loader',
                options: {
                    name: 'img/[name].[ext]',
                    limit: 2048
                }
            },
            {
                test: /\.vue$/,
                loader: 'vue-loader',
                options: {
                    loaders: {
                        css: ExtractTextPlugin.extract({ // 开发阶段不建议开启，无法启动样式热重载
                            use: [
                                {
                                    loader: 'css-loader',
                                    options: {
                                        importLoaders: 1,
                                    }
                                },
                                {
                                    loader: 'postcss-loader',
                                    options: {
                                        sourceMap: 'inline'
                                    }
                                }
                            ],
                            fallback: 'style-loader' // <- 这是vue-loader的依赖，所以如果使用npm3，则不需要显式安装
                        }),
                        sass: ExtractTextPlugin.extract({
                            use: [
                                {
                                    loader: 'css-loader',
                                    options: {
                                        importLoaders: 1,
                                    }
                                },
                                {
                                    loader: 'postcss-loader',
                                    options: {
                                        sourceMap: 'inline'
                                    }
                                },
                                {
                                    loader: 'sass-loader'
                                }
                            ],
                            fallback: 'style-loader'
                        })
                    }
                }
            }
        ]
    },
    plugins: [
        new ExtractTextPlugin('[name].css'),
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: '"production"'
            }
        }),
        new webpack.optimize.UglifyJsPlugin({
            sourceMap: true,
            compress: {
                warnings: false
            }
        })
    ]
})