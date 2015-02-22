var React = require('react')
var d = require('jsnox')(React)
var SimpleForm = require('./simpleform')

require('../styles/main.styl')
React.render(d(SimpleForm), document.querySelector('.app'))
