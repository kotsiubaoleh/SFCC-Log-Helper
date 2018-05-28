const webpackBase = require('./webpack.base');
const merge = require('webpack-merge');
const ChromeExtensionReloader  = require('webpack-chrome-extension-reloader');

module.exports = merge(webpackBase, {
    mode: 'development',
    watch: true,
    devtool: '#inline-source-map',
    plugins: [
        new ChromeExtensionReloader()
    ]
});