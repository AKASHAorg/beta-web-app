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
