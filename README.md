# clever-webpack

* webpack4新增内容

1. 需要额外安装 webpack-cli

* ## 代码分割 -- css

> 起因

让css能像js一样import在js中导入
>>> npm install --save-dev css-loader
>> 缺点1 css和js打包在一起 无法利用浏览器异步加载css特性
>> 解决1 引入ExtractTextWebpackPlugin插件分开打包css
>>> npm install --save-dev extract-text-webpack-plugin

注意:

    在webpack4之后 extract-text-webpack-plugin 插件会报错，必须使用mini-css-extract-plugin版本 或者 extract-text-webpack-plugin@next

```javascript
{
test: /\.styl$/,
use: ExtractTextPlugin.extract({
    // fallback: 'style-loader',
    use: 'css-loader'
})
```

* ## 代码分割 -- libraries

> 起因

由于每次改动很小一部分代码打包时 会将库文件重新打包一遍 浏览器无法利用缓存记录这

些库文件

>> 缺点1 库文件代码和业务代码混合在一块
>> 解决1 新建vendor入口存放库文件
>> 缺点2 上述方法实现库和业务代码分离  不过会发现两个文件都有库相关代码
>> 解决2 引入commonsChunkPlugin抽取重复代码
>> 缺点3 上述方法每次打包hash都在变化 vendor也会随着业务代码变化
>> 解决3 在commonsChunkPlugin插件配置中引入manifest分离webpack运行代码和vendor代码和业务代码

* ## manifest文件

每次webpack编译时会产生webpack runtime相关代码 会导致公用模块比如`vendor`hash值改变不能长期缓存 为了

让静态的库、静态资源从浏览器缓存中收益 提取webopack本身相关工作代码到manifest文件

在webpack4之前利用自带的 CommonsChunkPlugin 插件

```javascript
new webpack.optimize.CommonsChunkPlugin({
    names: ['vendor', 'manifest'] // 指定公共 bundle 的名字。
})
```

* ## html-webpack-plugin

> 起因 每次打包都会生成hash 手动更改html引用对应的js和css显然不合理
> 解决 引入html-webpack-plugin插件
>> 详细查看此链接 [html-webpack-plugin](https://segmentfault.com/a/1190000008590102)

* ## externals

将一些体积过大的依赖文件可通过外部cdn等方式额外引入 让webpack不需要打包此类依赖项的时候使用

```javascript
externals: {
    "lodash": {
        commonjs: "lodash",
        commonjs2: "lodash",
        amd: "lodash",
        root: "_"
    }
}
```

* ## UglifyJsPlugin

压缩js 在webpack4时候默认已去掉UglifyJsPlugin 取而代之的是 uglifyjs-webpack-plugin 单独一个插件

> ## 参考资料

1. [Webpack4 那点儿东西](https://juejin.im/post/5abef5e96fb9a028e33b9035)

2. [webpack4——SplitChunksPlugin使用指南](https://blog.csdn.net/qq_26733915/article/details/79458533)

3. [uglifyjs-webpack-plugin](https://webpack.docschina.org/plugins/uglifyjs-webpack-plugin/)