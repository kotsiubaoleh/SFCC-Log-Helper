const webpackBase = require('./webpack.base');
const merge = require('webpack-merge');

module.exports = merge(webpackBase, {
    mode: 'development',
    watch: true,
    devtool: '#inline-source-map'
});