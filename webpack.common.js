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
                test: /\.(scss|css)$/,
                use: [
                        'style-loader', 
                        {
                            loader : 'css-loader',
                            options : {
                                modules : {
                                    localIdentName : "[local]--[hash:base64:5]"
                                }
                            }
                        }, 
                        'sass-loader'],
            },
            {
                test: /\.(gltf|glb)$/, 
                use: {
                    loader: 'file-loader',
                }
            },
            { 
                test: /\.(mp4|png|svg|jpg|gif|jpe?g)$/, 
                use: {
                    loader: 'url-loader?limit=50000' 
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