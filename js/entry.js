var React = require('react')
var d = require('jsnox')(React)


var SimpleForm = React.createClass({
    displayName: 'SimpleForm',

    onSubmit(evt) {
        evt.preventDefault()
        var inputEl = this.refs.text.getDOMNode()
        alert(inputEl.value)
        inputEl.value = ''
    },

    render() {
        return d('form', { onSubmit: this.onSubmit }, [
            d('h1', 'Simple React example'),
            d('input:text[placeholder=Enter something]@text'),
            d('button:submit', 'Submit')
        ])
    }
})

React.render(d(SimpleForm), document.querySelector('.app'))
