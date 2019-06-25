const path = require('path');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CopyPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin =  require('html-webpack-plugin');

module.exports = {
    entry: {
        app: './src/app',
        popup: './src/popup',
        background: './src/background.js'
    },
    output: {
        path: path.resolve(__dirname, 'build'),
        filename: '[name].js'
    },
    module: {
        rules: [
            { 
                test: /\.txt$/, 
                use: 'raw-loader' 
            },
            {
                test: /\.html$/,
                use: 'html-loader'
            },
            {
                test: /\.vue$/,
                use: 'vue-loader'
            },
            {
                test: /\.css$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                ]
            },
            {
                test: /\.scss$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    'sass-loader'
                ]
            },
            {
                test: /\.(ttf|eot|woff|woff2|svg)$/,
                use: {
                    loader: 'url-loader'
                }
            }
        ]
    },
    resolve: {
        alias: {
            'vue$': 'vue/dist/vue.common.js',
            '@app': path.resolve(__dirname, 'src')
        },
        mainFiles: ['index', '_index'],
        extensions: ['.vue', '.js', '.scss']
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: '[name]styles.css'
        }),
        new VueLoaderPlugin(),
        new CopyPlugin([{
            from: './src/manifest.json',
            to: './manifest.json'
        }]),
        new HtmlWebpackPlugin({
            filename: 'popup.html',
            chunks: ['popup'],
            template: 'src/template/index.html'
        }),
        new HtmlWebpackPlugin({
            filename: 'app.html',
            chunks: ['app'],
            template: 'src/template/index.html'
        })
    ]
};
