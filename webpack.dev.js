const webpackBase = require('./webpack.base');
const merge = require('webpack-merge');
const ExtensionReloader  = require('webpack-extension-reloader');

module.exports = merge(webpackBase, {
    mode: 'development',
    watch: true,
    devtool: '#inline-source-map',
    plugins: [
        new ExtensionReloader({
            entries: {
                popup: 'popup',
                app: 'app',
                background: 'background'
            }
        })
    ]
});

