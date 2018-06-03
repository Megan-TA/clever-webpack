/* eslint-disable no-useless-escape,no-dupe-keys */
var path = require('path')
const webpack = require('webpack')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
// const MiniCssExtractPlugin = require('mini-css-extract-plugin')
// const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin")
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')

const CONFIG = require('./config')
const devMode = process.env.NODE_ENV !== 'production'

module.exports = {
    entry: CONFIG.entryTemplate || {main: path.resolve(__dirname, '../src/js/index.jsx')},
    module: {
        rules: [
            {
                test: /\.(styl|css)$/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: [
                        {
                            loader: 'css-loader',
                            options: {
                                url: false,
                                sourceMap: true,
                                minimize: true
                            }
                        }, 
                        {
                            loader: 'stylus-loader',
                            options: {
                                sourceMap: true
                            }
                        }
                    ]
                })
            },
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                include: path.resolve(__dirname, '../src'),
                use: {
                    loader: 'babel-loader'
                }
            },
            {
                test: /\.(png|svg|jpg|gif)$/,
                use: [
                    'file-loader'
                ]
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/,
                use: [
                    'file-loader'
                ]
            },
            {
                test: /\.(csv|tsv)$/,
                use: [
                    'csv-loader'
                ]
            },
            {
                test: /\.xml$/,
                use: [
                    'xml-loader'
                ]
            }
        ]
    },
    resolve: {
        extensions: ['.js', '.jsx', '.css', '.styl', '.scss'],
        alias: {
            'lib': path.resolve(__dirname, '../lib'),
            'css': path.resolve(__dirname, '../src/css'),
            'js': path.resolve(__dirname, '../src/js')
        }
    },
    plugins: [
        ...CONFIG.HTMLPlugins,
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify('production')
        }),
        new webpack.optimize.SplitChunksPlugin({
            cacheGroups: {
                default: {
                    minChunks: 2,
                    priority: -20,
                    reuseExistingChunk: true,
                },
                // 打包第三方库/类
                vendor: {
                    name: 'vendor',
                    chunks: 'initial',
                    minChunks: 2,
                    minSize: 0,
                    maxAsyncRequests: 5,
                    maxInitialRequests: 3
                },
                styles: {
                    name: 'styles',
                    test: /\.scss|css|styl$/,
                    chunks: 'all',
                    enforce: true
                }
            }
        }),

        new webpack.optimize.RuntimeChunkPlugin({
            name: "js/manifest"
        }),

        new webpack.ProvidePlugin({
            
        }),
        new ExtractTextPlugin({
            filename: 'css/style.css',
            allChunks: true
        }),

        new CleanWebpackPlugin(
            ['dist/*.bundle.js', 'dist/*.bundle.js.map', 'dist/chunk/*'],
            {
                root: __dirname,
                verbose: false,
                dry: false,
                exclude: ['dist/vendor.*.js']
            }
        )
    ]
}
