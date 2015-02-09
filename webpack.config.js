// Info on splitting css into separate files:
// http://webpack.github.io/docs/stylesheets.html

var path = require('path')
var autoprefixer = require('autoprefixer-stylus')
var ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
    entry: ['./styles/main.styl', './js/entry.js'],
    output: {
        path: path.join(__dirname, 'assets'),
        filename: '[name].js'
    },

    module: {
        loaders: [
              { test: /\.js$/, exclude: /node_modules/, loader: "6to5-loader"},
              { test: /\.styl$/, loader: ExtractTextPlugin.extract("style-loader", "css-loader!stylus-loader") }
        ]
    },

    stylus: { use: [autoprefixer()] },
    plugins: [
        new ExtractTextPlugin("main.css", { allChunks: true })
    ]
}
