// Info on splitting css into separate files:
// http://webpack.github.io/docs/stylesheets.html

var webpack = require('webpack')
var path = require('path')
var autoprefixer = require('autoprefixer-stylus')
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var DEV_MODE = (process.env.NODE_ENV === 'development')

// Use a different loading strategy for stylus in dev mode
// This enables HMR; see github.com/webpack/extract-text-webpack-plugin/issues/30
var stylusLoader = DEV_MODE ?
    'style-loader!css-loader!stylus-loader' :
    ExtractTextPlugin.extract('style-loader', 'css-loader!stylus-loader')

module.exports = {
    entry: {
        app: ['./js/entry.js'],
        styles: ['./styles/main.styl'], // Build css as separate bundle for production
        vendor: ['react', 'jsnox'],
    },
    output: {
        path: path.join(__dirname, 'assets'),
        filename: '[name].js'
    },

    module: {
        loaders: [
            { test: /\.js$/, exclude: /node_modules/, loaders: ['react-hot', 'babel-loader']},
            { test: /\.styl$/, loader: stylusLoader }
        ]
    },

    stylus: { use: [autoprefixer()] },
    plugins: [
        new webpack.optimize.CommonsChunkPlugin('vendor', 'vendor.js')
    ]
}

// Currently only used in production mode (without HMR)
// TODO: prevent styles.js from being created along with styles.css
if (!DEV_MODE) module.exports.plugins.push(new ExtractTextPlugin('styles.css'))
