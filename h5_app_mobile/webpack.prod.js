const path = require('path');
const SOURCE_DIR = path.resolve('./src');
const HtmlPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = {
    mode: 'development',
    resolve: {
        extensions: ['.js', '.jsx', '.json']
    },
    entry: {
        main: path.join(SOURCE_DIR, '/entry/main.jsx')
    },
    output: {
        filename: 'js/[name][chunkhash].js',
        path: path.resolve(__dirname, '../h5_build/build'),
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                include: SOURCE_DIR,
                use: [
                    {
                        loader: 'babel-loader',
                        options: {
                            presets: [['env', {module: false}], 'stage-0', 'react'],
                            plugins: [
                                'transform-decorators-legacy', //注解支持
                                [
                                    'transform-runtime', //async/await支持
                                    {
                                        helpers: false,
                                        polyfill: false,
                                        regenerator: true,
                                        moduleName: 'babel-runtime'
                                    }
                                ],
                                [
                                    'import', //antd引入
                                    {
                                        libraryName: 'antd-mobile',
                                        libraryDirectory: 'es',
                                        style: true // `style: true` 会加载 less 文件
                                    }
                                ]
                            ]
                        }
                    }
                ]
            },
            {
                test: /\.less$/,
                use: [
                    'style-loader',
                    {loader: 'css-loader', options: {importLoaders: 1}},
                    {loader: 'less-loader', options: {javascriptEnabled: true}}
                ]
            },
            {
                test: /\.css$/,
                use: [
                    {
                        loader: 'style-loader',
                    },
                    {
                        loader: 'css-loader',
                        options: {
                            importLoaders: 1,
                        }
                    },
                    {
                        loader: "postcss-loader",
                        options: {           // 如果没有options这个选项将会报错 No PostCSS Config found
                            plugins: () => [
                                require('autoprefixer')(), //CSS浏览器兼容
                            ]
                        }
                    }
                ]
            },
            {
                test: /\.(png|jpg|gif|svg|eot|ttf|woff|woff2|ico)$/,
                use: ['file-loader?limit=1000&name=assets/images/[md5:hash:base64:10].[ext]']
            }
        ]
    },
    plugins: [
        new CleanWebpackPlugin(
            [path.resolve(__dirname, '../h5_build/build')], //匹配删除的文件
            {
                root: __dirname, //根目录
                verbose: true, //开启在控制台输出信息
                dry: false //启用删除文件
            }
        ),
        new HtmlPlugin({
            chunks: 'main',
            template: path.join(SOURCE_DIR, '/html/index.html'),
            filename: 'index.html',
            minify: {                    //html压缩
                removeComments: true,     //移除注释
                collapseWhitespace: true //移除空格
            }
        })
    ]
};
