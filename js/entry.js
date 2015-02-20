var React = require('react')
var d = require('jsnox')(React)
var SimpleForm = require('./simpleform')

React.render(d(SimpleForm), document.querySelector('.app'))
