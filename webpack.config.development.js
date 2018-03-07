import path from 'path';
import webpack from 'webpack';
import merge from 'webpack-merge';
import baseConfig from './webpack.config.base';

const HtmlWebpackPlugin = require('html-webpack-plugin');
const port = process.env.PORT || 3000;
const publicPath = `https://localhost:${port}/dist`;

export default merge(baseConfig, {
    devtool: 'eval-source-map',

    entry: {
        main: [
            'react-hot-loader/patch',
            `webpack-dev-server/client?https://localhost:${port}/`,
            'webpack/hot/only-dev-server',
            path.join(__dirname, 'main/index.js')
        ]
    },
    output: {
        publicPath: `https://localhost:${port}/dist/`,
        path: path.resolve(__dirname, 'dist'),
        sourceMapFilename: "./bundle.js.map",
        pathinfo: true,
        path: __dirname,
        filename: "[name].bundle.js",
        chunkFilename: "[name].[hash].[id].js"
    },
    mode: 'development',
    module: {
        rules: [
            {
                test: /\.global\.css$/,
                use: [
                    { loader: 'style-loader' },
                    {
                        loader: 'css-loader',
                        options: {
                            sourceMap: true,
                        },
                    }
                ]
            },
            {
                test: /^((?!\.global).)*\.css$/,
                use: [
                    { loader: 'style-loader' },
                    {
                        loader: 'css-loader',
                        options: {
                            modules: true,
                            sourceMap: true,
                            importLoaders: 1,
                            localIdentName: '[name]__[local]__[hash:base64:5]',
                        }
                    },
                ]
            },
            {
                test: /^((?!\.global).)*\.scss$/,
                use: [
                    { loader: 'style-loader' },
                    {
                        loader: 'css-loader',
                        options: {
                            modules: true,
                            sourceMap: true,
                            importLoaders: 1,
                            localIdentName: '[name]__[local]__[hash:base64:5]',
                        }
                    },
                    { loader: 'sass-loader', options: { sourceMap: true } }
                ]
            },
            {
                test: /^((?!\.global).)*\.less$/,
                use: [
                    { loader: 'style-loader' },
                    {
                        loader: 'css-loader',
                        options: {
                            sourceMap: true,
                            importLoaders: 1,
                            localIdentName: '[name]__[local]__[hash:base64:5]',
                        }
                    },
                    { loader: 'less-loader', options: { sourceMap: true } }
                ]
            },
            {
                test: /\.woff(\?[a-z0-9-=]+)?$/,
                use: {
                    loader: 'url-loader',
                    options: {
                        limit: 10000,
                        mimetype: 'application/font-woff',
                    }
                },
            },
            {
                test: /\.woff2(\?[a-z0-9-=]+)?$/,
                use: {
                    loader: 'url-loader',
                    options: {
                        limit: 10000,
                        mimetype: 'application/font-woff',
                    }
                }
            },
            {
                test: /\.ttf(\?[a-z0-9-=]+)?$/,
                use: {
                    loader: 'url-loader',
                    options: {
                        limit: 10000,
                        mimetype: 'application/octet-stream'
                    }
                }
            },
            {
                test: /\.eot(\?[a-z0-9-=]+)?$/,
                use: 'file-loader',
            },
            {
                test: /\.svg(\?[a-z0-9-=]+)?$/,
                use: {
                    loader: 'url-loader',
                    options: {
                        limit: 10000,
                        mimetype: 'image/svg+xml',
                    }
                }
            },
            {
                test: /\.(?:ico|gif|png|jpg|jpeg|webp)$/,
                use: 'url-loader',
            }
        ]
    },

    plugins: [
        // https://webpack.js.org/concepts/hot-module-replacement/
        new webpack.HotModuleReplacementPlugin(),
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify('development'),
            'process.env.DARK_THEME': JSON.stringify(process.env.DARK_THEME),
            'process.env.AKASHA_VERSION': JSON.stringify('beta#0')
        }),
        new HtmlWebpackPlugin({
            template: './app/hot-dev-app.html'
        }),
    ],
    devServer: {
        port,
        hot:
            true,
        inline:
            false,
        historyApiFallback:
            true,
        contentBase:
            path.join(__dirname, 'dist'),
        https: true,
        publicPath
    }
    ,
})
;