const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');
const path = require('path');
module.exports = merge(common, {
    entry: './src/index.ts',
    mode: 'production',
    performance: {
        hints: false
    },
    output: {
        filename: 'bundle.js',
        library: "skeletalmuscledrawer",
        libraryTarget: "umd",
        path: path.resolve(__dirname, './dist'),
        umdNamedDefine: true,
    }
});
