const webpackBase = require('./webpack.base');
const merge = require('webpack-merge');
const ExtensionReloader  = require('webpack-extension-reloader');

module.exports = merge(webpackBase, {
    mode: 'development',
    watch: true,
    devtool: '#inline-source-map',
    plugins: [
        new ExtensionReloader({
            port: 9090, // Which port use to create the server
            reloadPage: true, // Force the reload of the page also
            entries: { // The entries used for the content/background scripts
                popup: 'popup',
                contentScript: 'content', // Use the entry names, not the file name or the path
                background: 'background' // *REQUIRED
            }
        })
    ]
});

