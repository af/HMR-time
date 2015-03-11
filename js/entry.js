let React = require('react')
let d = require('jsnox')(React)
let { ListApp } = require('./components')

// TODO: make this conditional (dev mode only):
require('../styles/main.styl')

React.render(d(ListApp), document.querySelector('.app'))
