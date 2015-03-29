# Stop: HMR Time!

This repo is an experiment with [webpack](http://webpack.github.io/),
and more specifically its [Hot Module Replacement
(HMR](http://webpack.github.io/docs/hot-module-replacement-with-webpack.html) feature.

In development, HMR automagically syncs your front-end code with your browser
(without refreshes) as you save it. This code syncs the following files live:

* [Stylus](http://learnboost.github.io/stylus/) styles, run through
  [autoprefixer](https://github.com/postcss/autoprefixer)
* [React.js](http://facebook.github.io/react/) components, via
  [react-hot-loader](https://github.com/gaearon/react-hot-loader)
    * [Babeljs](https://babeljs.io) is also used for ES6 support


## Usage

* Run `node devserver.js`, and open `localhost:8080/app.html` in your browser.
* Edit `main.styl` in your editor, and save it. Watch as your browser loads the
  new css changes automatically.
* Edit `simpleform.js` in your editor, and save it. Your browser should pick
  up your changes in the same way, _while preserving any local state_ that you
  created while using the page.


## Notes/Gotchas

* So far, I can only get HMR working by serving assets from / instead of /assets/
    * see https://github.com/webpack/webpack/issues/497

* Can't use HMR with extract-text-webpack-plugin, which is needed to process
  & save styles as plain css files.
    * Current workaround: inject styles via `require()` when in development,
      use regular css files for production/build usage.
    * See https://github.com/webpack/extract-text-webpack-plugin/issues/30


## TODO

* Conditional usage of css require (based on NODE_ENV)
