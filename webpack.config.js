const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
    entry: './src/index.ts',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, './dist')
    },
    plugins: [
        new HtmlWebpackPlugin({ template: './public/index.html', dest: './dist/index.html' }),
        new CleanWebpackPlugin()
    ],
    module: {
        rules: [
            { test: /.ts$/, loader: 'ts-loader' }
        ]
    },
    resolve: {
        extensions: ['.ts', '.js']
    }
}