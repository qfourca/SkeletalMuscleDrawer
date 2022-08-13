const { merge } = require('webpack-merge')
const common = require('./webpack.common.js')
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = merge(common, {
    entry: './src/dev.ts',
    mode: 'development',
    devtool: 'eval-source-map',
    devServer: {
        static: {
            directory: path.join(__dirname, './dist'),
        },
        hot: true,
    },
    module: {
        rules: [
            {
                test: /\.json$/,
                type: 'javascript/auto',
                use: {
                    loader: 'json5-loader',
                }
            },
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            inject: false,
            template: path.resolve(__dirname, 'src', 'static', 'index.html'),
            favicon: "./src/static/favicon/favicon.ico",
        }),
    ]
})