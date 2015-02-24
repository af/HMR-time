let React = require('react')
let d = require('jsnox')(React)


let idCounter = 1
let ListForm = React.createClass({
    displayName: 'ListForm',

    onSubmit(evt) {
        evt.preventDefault()

        let inputEl = this.refs.text.getDOMNode()
        let newItem = { id: idCounter++, text: inputEl.value, done: false }
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

    toggleDone() {
        this.props.item.done = !this.props.item.done
        this.forceUpdate()  // FIXME: have parent re-render instead
    },

    render() {
        let item = this.props.item
        return d('li.item', { className: item.done ? 'done' : '' }, [
            d('input:checkbox', { checked: item.done, onChange: this.toggleDone }),
            item.text
        ])
    }
})


let ListApp = React.createClass({
    displayName: 'SimpleForm',

    getInitialState() {
        return { items: [] }
    },

    onNewItem(item) {
        this.setState({ items: this.state.items.concat([item]) })
    },

    render() {
        return d('div.wrap', [
            d('h1', 'Yet another TODO demo'),
            d(ListForm, { onNewItem: this.onNewItem }),
            d('ul', this.state.items.map(i => d(ListItem, { item: i, key: i.id })))
        ])
    }
})


module.exports = { ListApp, ListForm, ListItem }
