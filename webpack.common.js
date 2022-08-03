const path = require('path');

module.exports = {
    target: "web",
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                use: ['babel-loader'],
              },
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            },
            {
                test: /\.gltf$/,
                use: 'file-loader'
            }
        ],
    },
    resolve: {
        alias: {
            three: path.resolve('./node_modules/three')
        },
        extensions: ['.tsx', '.ts', '.js'],
    },
    output: {
        filename: 'bundle.js',
        library: "skeletalmuscledrawer",
        libraryTarget: "umd",
        path: path.resolve(__dirname, './dist'),
    }
};