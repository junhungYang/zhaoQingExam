const merge = require('webpack-merge')
const webpack = require('webpack')
const baseWebpackConfig = require('./webpack.base.conf.js')

module.exports = function(env){
    return merge(baseWebpackConfig,{
        output: {
            publicPath: '/dist/'
        },
        module:{
            rules: [
                {
                    test: /\.(png|jpg|gif|svg)$/,
                    loader: 'url-loader',
                    options: {
                        name: 'img/[name].[ext]',
                        limit: 1
                    }
                },
                {
                    test: /\.scss$/,
                    use: [{
                        loader: "style-loader"
                    }, {
                        loader: "css-loader"
                    }, {
                        loader: "sass-loader"
                    }]
                },
                {
                    test: /\.vue$/,
                    loader: 'vue-loader'
                }
            ]
        },
        devServer: {
            hot: true,
            historyApiFallback: true,
            noInfo: true
        },
        plugins: [
            new webpack.DefinePlugin({
                'process.env.NODE_ENV': '"development"'
            }),
            new webpack.NamedModulesPlugin(),
            new webpack.NamedChunksPlugin()
        ],
        devtool: '#source-map'
    })
}