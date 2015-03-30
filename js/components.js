let Immutable = require('immutable')
let React = require('react')
let d = require('jsnox')(React)


let ListForm = React.createClass({
    displayName: 'ListForm',
    propTypes: {
        onNewItem: React.PropTypes.func.isRequired
    },

    onSubmit(evt) {
        evt.preventDefault()

        let inputEl = this.refs.text.getDOMNode()
        let newItem = { text: inputEl.value, done: false }
        this.props.onNewItem(newItem)
        inputEl.focus()
        inputEl.value = ''
    },

    render() {
        return d('form', { onSubmit: this.onSubmit }, [
            d('input[placeholder=Enter something]@text'),
            d('button:submit', 'Add'),
        ])
    }
})


let ListItem = React.createClass({
    displayName: 'ListItem',
    propTypes: {
        item: React.PropTypes.object.isRequired,
        toggleDone: React.PropTypes.func.isRequired
    },

    render() {
        let item = this.props.item.toObject()
        return d('li.item', { className: item.done && 'done', onClick: this.props.toggleDone }, [
            d('input:checkbox', { checked: item.done, readOnly: true }),
            item.text
        ])
    }
})


let ListApp = React.createClass({
    displayName: 'SimpleForm',

    getInitialState() {
        return { items: Immutable.List() }
    },

    toggleDone(item, index) {
        let updatedItems = this.state.items.updateIn([index, 'done'], d => !d)
        this.setState({ items: updatedItems })
    },

    onNewItem(item) {
        let newList = this.state.items.push(Immutable.fromJS(item))
        this.setState({ items: newList })
    },

    render() {
        return d('div.wrap', [
            d('h1', 'Yet another TODO demo'),
            d(ListForm, { onNewItem: this.onNewItem }),
            d('ul', this.state.items.toArray().map((i, idx) => {
                return d(ListItem, {
                    item: i,
                    key: idx,
                    toggleDone: this.toggleDone.bind(this, i, idx)
                })
            }))
        ])
    }
})


module.exports = { ListApp, ListForm, ListItem }
