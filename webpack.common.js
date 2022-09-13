const path = require('path');

module.exports = {
    target: "web",
    module: {
        rules: [
            {
                test: /\.ts$/,
                include: path.resolve(__dirname, "./src"),
                use: [
                {
                    loader: "babel-loader",
                },
                "ts-loader",
                ],
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
                test: /\.gltf$/,
                use: {
                    loader: 'file-loader',
                }
            },
            { 
                test: /\.(mp4|png|svg|jpg|gif|jpe?g)$/, 
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
    }
};