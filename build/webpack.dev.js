const baseWebpackCfg = require('./webpack.config')
const merge = require('webpack-merge')
const webpack = require('webpack')
const path = require('path')

module.exports = merge(baseWebpackCfg, {
    mode: 'development',
    // watch: true,
    // watchOptions: {
    //     ignored: /node_modules/,
    //     // 防止重复保存频繁重新编译,500毫米内重复保存不打包
    //     aggregateTimeout: 500,
    //     // 每秒询问的文件变更的次数
    //     poll: 1000
    // },
    devtool: 'eval-source-map',
    devServer: {
        inline: true,
        contentBase: path.join(__dirname, '../src'),
        host: 'localhost',
        port: 8080,
        compress: false,
        openPage: '../page/index.html',
        open: true,
        clientLogLevel: 'none',
        hot: true,
        hotOnly: true
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin()
    ],
    output: {
        filename: '[name].bundle.js',
        path: path.resolve(__dirname, '../dist'),
        chunkFilename: 'js/[name].[chunkhash].js',
        sourceMapFilename: '[file].map'
    }
})
