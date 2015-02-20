var React = require('react')
var d = require('jsnox')(React)


var SimpleForm = React.createClass({
    displayName: 'SimpleForm',

    getInitialState() {
        return { counter: 0, log: [] }
    },

    onSubmit(evt) {
        evt.preventDefault()

        var inputEl = this.refs.text.getDOMNode()
        var newLog = this.state.counter + ' ' + inputEl.value;
        this.setState({
            counter: this.state.counter += 1,
            log: this.state.log.concat([newLog])
        });

        inputEl.focus()
        inputEl.value = ''
    },

    render() {
        return d('form', { onSubmit: this.onSubmit }, [
            d('h1', 'Simple React example'),
            d('input:text[placeholder=Enter something]@text'),
            d('button:submit', 'Submit'),
            this.state.log.map(l => d('p.item', {key: l}, l))
        ])
    }
})

React.render(d(SimpleForm), document.querySelector('.app'))
