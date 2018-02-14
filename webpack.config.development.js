import path from 'path';
import webpack from 'webpack';
import merge from 'webpack-merge';
import baseConfig from './webpack.config.base';
import ExtractTextPlugin from "extract-text-webpack-plugin";
const CleanWebpackPlugin = require('clean-webpack-plugin');
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
        ],
        vendor: [
            "bluebird",
            "antd",
            "ramda",
            "rxjs",
            "react",
            "dexie",
            "immutable",
            "react-dnd",
            "react-dnd-html5-backend",
            "react-dom",
            "react-intl",
            "react-masonry-component",
            "react-redux",
            "react-router",
            "react-router-dom",
            "react-router-redux",
            "react-tap-event-plugin",
            "react-validation-mixin",
            "react-waypoint",
            "redux",
            "redux-saga"
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

    module: {
        rules: [
            // Extract all .global.css to style.css as is
            {
                test: /\.global\.css$/,
                use: ExtractTextPlugin.extract({
                    use: 'css-loader',
                    fallback: 'style-loader',
                })
            },
            {
                test: /\.module\.css$/,
                use: ExtractTextPlugin.extract({
                        use: ['style-loader',
                            'css-loader?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]']
                    }
                )
            },
            // Pipe other styles through css modules and append to style.css
            {
                test: /^((?!\.global).)*\.css$/,
                use: ExtractTextPlugin.extract({
                    use: {
                        loader: 'css-loader',
                        options: {
                            modules: true,
                            importLoaders: 1,
                            localIdentName: '[name]__[local]__[hash:base64:5]',
                            minimize: true
                        }
                    }
                }),
            },
            {
                test: /^((?!\.global).)*\.scss$/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: ['css-loader?modules&importLoaders=1&minimize&localIdentName=[name]__[local]___[hash:base64:5]', 'sass-loader']
                })
            },
            {
                test: /^((?!\.global).)*\.less$/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: ['css-loader?importLoaders=1&minimize&localIdentName=[name]__[local]___[hash:base64:5]', 'less-loader']
                })
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
        new webpack.NoEmitOnErrorsPlugin(),
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify('development'),
            'process.env.DARK_THEME': JSON.stringify(process.env.DARK_THEME),
            'process.env.AKASHA_VERSION': JSON.stringify('beta#0')
        }),
        new CleanWebpackPlugin(['dist']),

        new HtmlWebpackPlugin({
            template: './app/hot-dev-app.html'
        }),
        new ExtractTextPlugin({
            filename: "style.[id].css",
            allChunks: true,
            ignoreOrder: true
        }),
        new webpack.NamedModulesPlugin(),
        // turn debug mode on.
        new webpack.LoaderOptionsPlugin({
            debug: true
        }),
        new webpack.optimize.CommonsChunkPlugin({
            name: 'vendor'
        }),
        new webpack.optimize.CommonsChunkPlugin({
            name: 'manifest'
        })
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