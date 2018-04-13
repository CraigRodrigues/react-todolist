import React, { Component } from 'react';
import { Route, Link } from 'react-router-dom';
import './App.css';

import Logo from './Logo';
import Todos from './Todos';
import CreateButton from './CreateButton';
import NewTodo from './NewTodo';

class App extends Component {
    constructor() {
        super();

        this.state = {
            todos: [
                {
                    id: 1,
                    completed: false,
                    title: 'Example Todo',
                    notes: 'This is an example todo!'
                },
                {
                    id: 2,
                    completed: false,
                    title: 'Example Todo 2',
                    notes: 'This is an example todo too!'
                },
                {
                    id: 3,
                    completed: false,
                    title: 'Example Todo 3',
                    notes: 'Three is an example todo!'
                }
            ]
        };

        this.toggleComplete = this.toggleComplete.bind(this);
    }

    toggleComplete(id) {
        let selectedTodo = this.state.todos.find((todo) => todo.id === id);

        selectedTodo.completed = !selectedTodo.completed;
        this.setState({ todos: this.state.todos });
    }

    createTodo(title, notes) {

    }

    editTodo(id) {

    }

    deleteTodo(id) {

    }

    render() {
        return (
            <div id="App">
                <Logo />

                <Route exact path='/' render={(props) => <Todos {...props} todos={this.state.todos} toggleComplete={this.toggleComplete} />} />
                <Route path='/new' component={NewTodo} />

                <Link to='/new'><CreateButton /></Link>
            </div>
        );
    }
}

export default App;
