// Takes in the list of todos, a callback and action word
import React from 'react';
import shortid from 'shortid';

export default class TodoForm extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            id: shortid.generate(),
            complete: false,
            title: '',
            notes: ''
        };

        this.handleTitleChange = this.handleTitleChange.bind(this);
        this.handleNotesChange = this.handleNotesChange.bind(this);
        this.handleAction = this.handleAction.bind(this);
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        let id = nextProps.match.params.id;

        if (id) {
            return nextProps.todos.find((x) => x.id === id);
        }

        return null;
    }

    handleTitleChange(event) {
        this.setState({ title: event.target.value });
    }

    handleNotesChange(event) {
        this.setState({ notes: event.target.value });
    }

    handleAction() {
        this.props.callback(this.state);
        this.props.history.push('/');
    }

    render() {
        let { title, notes } = this.state;
        let { history, action } = this.props;

        return (
            <div className="new-todo">
                <div>
                    <label htmlFor="title">Title</label>
                    <input
                        type="text"
                        name="title"
                        value={title}
                        onChange={this.handleTitleChange}
                    />
                </div>
                <div>
                    <label htmlFor="notes">Notes</label>
                    <textarea
                        name="notes"
                        placeholder="Enter notes"
                        value={notes}
                        onChange={this.handleNotesChange}
                    />
                </div>
                <button onClick={this.handleAction}>{action}</button>
                <button onClick={() => history.push('/')}>Cancel</button>
            </div>
        );
    }
}
