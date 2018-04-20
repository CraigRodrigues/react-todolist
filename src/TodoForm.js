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

        this.handleChange = this.handleChange.bind(this);
        this.handleAction = this.handleAction.bind(this);
    }

    static getDerivedStateFromProps(nextProps) {
        let id = nextProps.match.params.id;

        if (id) {
            return nextProps.todos.find((x) => x.id === id);
        }

        return null;
    }

    handleChange(event) {
        this.setState({ [event.target.name]: event.target.value });
    }

    handleAction() {
        this.props.callback(this.state);
        this.props.history.push('/');
    }

    render() {
        let { title, notes } = this.state;
        let { history, action } = this.props;

        return (
            <div className="todo-form">
                <h2>{action}</h2>
                <div>
                    <label htmlFor="title">Title</label>
                    <input type="text" name="title" value={title} onChange={this.handleChange} />
                </div>
                <div>
                    <label htmlFor="notes">Notes</label>
                    <textarea
                        name="notes"
                        placeholder="Enter notes"
                        value={notes}
                        onChange={this.handleChange}
                    />
                </div>
                <button onClick={this.handleAction}>{action}</button>
                <button onClick={() => history.push('/')}>Cancel</button>
            </div>
        );
    }
}
