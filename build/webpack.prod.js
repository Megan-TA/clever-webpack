const BaseWebpackCfg = require('./webpack.config')
const Merge = require('webpack-merge')
const UglifyjsWebpackPlugin = require('uglifyjs-webpack-plugin')
const Path = require('path')

module.exports = Merge(BaseWebpackCfg, {
    mode: 'production',
    plugins: [
        // 开启多线程 并进行tree shrinking
        new UglifyjsWebpackPlugin({
            uglifyOptions: {
                ie8: false,
                // 支持的ECMA规范版本
                ecma: 8,
                output: {
                    comments: false
                },
                cache: true,
                warnings: false,
                sourceMap: false,
                parallel: true
            }
        })
    ],
    output: {
        filename: '[name].[chunkhash:6].bundle.js',
        path: Path.resolve(__dirname, '../dist'),
        chunkFilename: 'js/[name].[chunkhash].js'
    }
})
