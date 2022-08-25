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
                exclude: /node_modules/,
                use: 'ts-loader',
            },
            {
                test: /\.gltf$/,
                use: {
                    loader: 'file-loader',
                }
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader'],
            },
            {
                test: /\.scss$/,
                use: ['style-loader', 'css-loader', 'sass-loader'],
            },
            { 
                test: /\.(png|svg|jpg|gif|jpe?g)$/, 
                use: {
                    loader: 'url-loader?limit=10000' 
                }
                
            }
        ],
    },
    resolve: {
        alias: {
            three: path.resolve('./node_modules/three')
        },
        extensions: ['.ts', '.js'],
    },
    output: {
        filename: 'bundle.js',
        library: "skeletalmuscledrawer",
        libraryTarget: "umd",
        path: path.resolve(__dirname, './dist'),
    }
};