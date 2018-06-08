const path = require('path');
const webpack = require('webpack');

const bundleOutputDir = './wwwroot/dist';

module.exports = {
    entry: {
        index: './ClientApp/index.js'        
    },
    module: {
        rules: [
            { test: /\.(js|jsx)$/, exclude: /node_modules/, use: [{loader: 'babel-loader', options: { presets: ['es2015', 'stage-0', 'react']}}]},
            { test: /\.css$/, use: ["style-loader", "css-loader"]},
            { test: /\.(png|jpg|jpeg|gif|svg)$/, use: 'url-loader?limit=25000' }
        ]
    },
    resolve: {
        extensions: ['*', '.js', '.jsx']
    },
    output: {
        path: path.join(__dirname, bundleOutputDir), 
        publicPath: '/dist',
        filename: '[name].bundle.js',
        chunkFilename: '[name].bundle.js'
    },
    
    devServer: {
        contentBase: '~/dist',
        hot: true
    },
    mode: 'production'
};