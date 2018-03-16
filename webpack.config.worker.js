import path from 'path';
import webpack from 'webpack';
import merge from 'webpack-merge';
import UglifyJSPlugin from 'uglifyjs-webpack-plugin';
import baseConfig from './webpack.config.base';
const CleanWebpackPlugin = require('clean-webpack-plugin');

export default merge(baseConfig, {
    devtool: 'source-map',

    entry: ['./main/ipfs.web.worker.js'],

    output: {
        path: path.join(__dirname, 'dist'),
        filename: "ipfs.web.worker.js",
    },
    plugins: [
        new CleanWebpackPlugin(['dist']),
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify('production'),
            'process.env.DARK_THEME': JSON.stringify(process.env.DARK_THEME),
            'process.env.AKASHA_VERSION': JSON.stringify('beta#1')
        }),

        new UglifyJSPlugin({
            parallel: true,
            sourceMap: true
        })
    ],

    target: 'web'
});



//  import path from 'path';
//  import webpack from 'webpack';
//  import ExtractTextPlugin from 'extract-text-webpack-plugin';
//  import merge from 'webpack-merge';
//  import HtmlWebpackPlugin from 'html-webpack-plugin';
//  import UglifyJSPlugin from 'uglifyjs-webpack-plugin';
//  import baseConfig from './webpack.config.base';
//
//  const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
//  // @TODO extract akasha themes in separated files
//  export default merge(baseConfig, {
//     devtool: 'source-map',
//
//     entry: ['./main/index'],
//
//     output: {
//         path: path.join(__dirname, 'dist')
//     },
//
//     module: {
//         rules: [
//             {
//                 test: /\.global\.css$/,
//                 use: [
//                     { loader: 'style-loader' },
//                     {
//                         loader: 'css-loader',
//                         options: {
//                             sourceMap: true,
//                         },
//                     }
//                 ]
//             },
//             {
//                 test: /^((?!\.global).)*\.css$/,
//                 use: [
//                     { loader: 'style-loader' },
//                     {
//                         loader: 'css-loader',
//                         options: {
//                             modules: true,
//                             sourceMap: true,
//                             importLoaders: 1,
//                             localIdentName: '[name]__[local]__[hash:base64:5]',
//                         }
//                     },
//                 ]
//             },
//             {
//                 test: /^((?!\.global).)*\.scss$/,
//                 use: [
//                     { loader: 'style-loader' },
//                     {
//                         loader: 'css-loader',
//                         options: {
//                             modules: true,
//                             sourceMap: true,
//                             importLoaders: 1,
//                             localIdentName: '[name]__[local]__[hash:base64:5]',
//                         }
//                     },
//                     { loader: 'sass-loader', options: { sourceMap: true } }
//                 ]
//             },
//             {
//                 test: /^((?!\.global).)*\.less$/,
//                 use: [
//                     { loader: 'style-loader' },
//                     {
//                         loader: 'css-loader',
//                         options: {
//                             sourceMap: true,
//                             importLoaders: 1,
//                             localIdentName: '[name]__[local]__[hash:base64:5]',
//                         }
//                     },
//                     { loader: 'less-loader', options: { sourceMap: true } }
//                 ]
//             },
//             {
//                 test: /\.woff(\?[a-z0-9-=]+)?$/,
//                 use: {
//                     loader: 'file-loader',
//                     options: {
//                         limit: 10000,
//                         mimetype: 'application/font-woff',
//                         name: 'fonts/[name].[ext]'
//                     }
//                 },
//             },
//             {
//                 test: /\.woff2(\?[a-z0-9-=]+)?$/,
//                 use: {
//                     loader: 'file-loader',
//                     options: {
//                         limit: 10000,
//                         mimetype: 'application/font-woff',
//                         name: 'fonts/[name].[ext]'
//                     }
//                 }
//             },
//             {
//                 test: /\.ttf(\?[a-z0-9-=]+)?$/,
//                 use: {
//                     loader: 'file-loader',
//                     options: {
//                         limit: 10000,
//                         mimetype: 'application/octet-stream',
//                         name: 'fonts/[name].[ext]'
//                     }
//                 }
//             },
//             {
//                 test: /\.eot(\?[a-z0-9-=]+)?$/,
//                 use: {
//                     loader: 'file-loader',
//                     options: {
//                         name: 'fonts/[name].[ext]'
//                     }
//                 }
//             },
//             {
//                 test: /\.svg(\?[a-z0-9-=]+)?$/,
//                 use: {
//                     loader: 'file-loader',
//                     options: {
//                         limit: 10000,
//                         mimetype: 'image/svg+xml',
//                         name: 'fonts/[name].[ext]'
//                     }
//                 }
//             },
//             {
//                 test: /\.(?:ico|gif|png|jpg|jpeg|webp)$/,
//                 use: {
//                     loader: 'file-loader',
//                     options: {
//                         name: 'fonts/[name].[ext]'
//                     }
//                 }
//             }
//         ]
//     },
//
//     plugins: [
//         /**
//          * Create global constants which can be configured at compile time.
//          *
//          * Useful for allowing different behaviour between development builds and
//          * release builds
//          *
//          * NODE_ENV should be production so that modules do not perform certain
//          * development checks
//          */
// new webpack.DefinePlugin({
//     'process.env.NODE_ENV': JSON.stringify('production'),
//     'process.env.DARK_THEME': JSON.stringify(process.env.DARK_THEME),
//     'process.env.AKASHA_VERSION': JSON.stringify('beta#1')
// }),
//     /**
//      * Dynamically generate index.html page
//      */
//     new HtmlWebpackPlugin({
//         filename: 'index.html',
//         template: 'app/app.template.html',
//         inject: false
//     }),
//
// ],
// mode: 'development',
//     target: 'web'
// });
