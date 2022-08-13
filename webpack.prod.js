const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');

module.exports = merge(common, {
    entry: './src/index.ts',
    mode: 'production',
    performance: {
        hints: false
    },
    module: {
        rules: [
            {
                test: /\.gltf$/,
                use: {
                    loader: 'file-loader',
                    options: {
                        publicPath: './node_modules/skeletalmuscle-drawer'
                    }
                }
            },
            {
                test: /\.json$/,
                type: 'javascript/auto',
                use: {
                    loader: 'json5-loader',
                }
            }
        ]
    }
});
