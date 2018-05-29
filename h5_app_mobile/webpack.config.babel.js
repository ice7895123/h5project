import 'babel-polyfill';
import path from 'path';
import HtmlPlugin from 'html-webpack-plugin';
import CleanWebpackPlugin from 'clean-webpack-plugin';
import OpenBrowserPlugin from 'open-browser-webpack-plugin';
import dotenv from 'dotenv';

const SOURCE_DIR = path.resolve('./src');
const BUILD_DIR = path.resolve('./build');
dotenv.config();
const {PORT, HOST} = process.env;

module.exports = {
    mode: 'production',
    resolve: {
        extensions: ['.js', '.jsx', '.json']
    },
    // 配置端口
    devServer: {
        inline: true,
        host: HOST,
        port: PORT
    },
    // 入口文件
    entry: {
        main: path.join(SOURCE_DIR, '/entry/main.jsx')
    },
    // 输出路径
    output: {
        filename: 'js/[name][chunkhash:8].js',
        path: BUILD_DIR
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
            // {
            //     test: /\.(png|jpg|jpeg|gif)$/,
            //     use: 'url-loader?limit=1024&name=[path][name].[ext]&outputPath=img/&publicPath=output/',
            // }
            {
                test: /\.(png|jpg|gif|svg|eot|ttf|woff|woff2|ico)$/,
                use: ['file-loader?limit=1000&name=assets/images/[md5:hash:base64:10].[ext]']
            }
        ]
    },
    plugins: [
        new HtmlPlugin({
            chunks: 'main',
            template: path.join(SOURCE_DIR, '/html/index.html'),
            filename: 'index.html'
        }),
        // 部署时，注释大概浏览器
        new OpenBrowserPlugin({
            browser: `google chrome`,   // 指定Google Chrome浏览器
            url: `http://${HOST}:${PORT}`
        }),
        new CleanWebpackPlugin(
            [BUILD_DIR], //匹配删除的文件
            {
                root: __dirname, //根目录
                verbose: false, //开启在控制台输出信息
                dry: false //启用删除文件
            }
        )
    ]
};
