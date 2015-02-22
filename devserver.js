// Attempt to get HMR working. See:
// http://webpack.github.io/docs/hot-module-replacement-with-webpack.html
// http://webpack.github.io/docs/webpack-dev-server.html

var WebpackDevServer = require('webpack-dev-server')
var webpack = require('webpack')

var config = require('./webpack.config.js')
config.plugins.push(
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin()
)
config.entry.unshift(
    'webpack-dev-server/client?http://0.0.0.0:8080',
    'webpack/hot/only-dev-server'
)

var server = new WebpackDevServer(webpack(config), {
    // when using webpack-dev-server from the API you need to set the filename property
    // as it is only given a default when used from the CLI
    filename: 'main.js',

    // webpack-dev-server options
    //contentBase: 'assets',
    inline: true,
    hot: true,          // Enable special support for Hot Module Replacement

    // webpack-dev-middleware options
    quiet: false,
    noInfo: false,
    lazy: false,        // Note: couldn't get HMR working without lazy:false
    watchDelay: 300,
    publicPath: '/assets/',
    stats: { colors: true }
})

console.log('servin on 8080')
server.listen(8080, 'localhost', function() {})
