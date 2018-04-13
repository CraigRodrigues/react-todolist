import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import Logo from './Logo';
import Todos from './Todos';
import Create from './Create';

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
    }

    createTodo() {

    }

    editTodo(id) {

    }

    deleteTodo(id) {

    }

    render() {
        return (
            <div id="App">
                <Logo />
                <Todos todos={this.state.todos} />
                <Create />
            </div>
        );
    }
}

export default App;
