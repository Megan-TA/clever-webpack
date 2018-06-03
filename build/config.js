/*
 * 定义一些默认配置
 * @Author: chen_huang
 * @Date: 2018-05-27 21:24:02
 * @Last Modified by: chen_huang
 * @Last Modified time: 2018-05-28 00:56:50
 */
const HtmlWebpackPlugin = require('html-webpack-plugin')
const path = require('path')
const fs = require('fs')
// 定义入口文件
const entryTemplate = {
    common: [
        'react',
        'react-dom'
    ]
}
// 定义html插件
const HTMLPlugins = []

let templateHtml = []

let _htmlTemplate = null

const getHtmlFromPage = (params) => {
    fs.readdirSync(params).forEach((item, index) => {
        if (item.indexOf('.html') > -1) templateHtml.push(item.split('.')[0])
    })
    return templateHtml
}

templateHtml = getHtmlFromPage('./src/page')

// 通过htmlwebpackPlugin创建多个模板文件
templateHtml.forEach((pageName) => {
	_htmlTemplate = new HtmlWebpackPlugin({
		filename: `./page/${pageName}.html`,
		template: path.resolve(__dirname, `../src/page/${pageName}.html`),
        // js标签插入head中去
        inject: 'head',
        minify: {
			removeComments: true,
			collapseWhitespace: false
        },
        hash: false
	})
	//template模板
	HTMLPlugins.push(_htmlTemplate)
	//定义入口文件
	entryTemplate[pageName] = path.resolve(__dirname, `../src/js/${pageName}.jsx`)
})

module.exports = {
    entryTemplate,
    HTMLPlugins
}