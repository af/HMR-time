let React = require('react')
let d = require('jsnox')(React)


let idCounter = 1
let ListForm = React.createClass({
    displayName: 'ListForm',
    propTypes: {
        onNewItem: React.PropTypes.func.isRequired
    },

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
    propTypes: {
        item: React.PropTypes.object.isRequired,
        onDone: React.PropTypes.func.isRequired
    },

    render() {
        let item = this.props.item
        return d('li.item', { className: item.done && 'done', onClick: this.props.onDone }, [
            d('input:checkbox', { checked: item.done, }),
            item.text
        ])
    }
})


let ListApp = React.createClass({
    displayName: 'SimpleForm',

    getInitialState() {
        return { items: [] }
    },

    onItemDone(item) {
        item.done = !item.done
        this.forceUpdate()  // this is hacky, but it's just a demo
    },

    onNewItem(item) {
        this.setState({ items: this.state.items.concat([item]) })
    },

    render() {
        return d('div.wrap', [
            d('h1', 'Yet another TODO demo'),
            d(ListForm, { onNewItem: this.onNewItem }),
            d('ul', this.state.items.map(i => {
                return d(ListItem, {
                    item: i,
                    key: i.id,
                    onDone: this.onItemDone.bind(this, i)
                })
            }))
        ])
    }
})


module.exports = { ListApp, ListForm, ListItem }
