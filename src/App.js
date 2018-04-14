import React, { Component } from 'react';
import { Route } from 'react-router-dom';

import Logo from './Logo';
import Todos from './Todos';
import TodoForm from './TodoForm';

class App extends Component {
    constructor() {
        super();

        this.state = {
            todos: [
                {
                    id: '1',
                    complete: false,
                    title: 'This is a sample Todo',
                    notes: ''
                },
                {
                    id: '2',
                    complete: false,
                    title: 'Click here to EDIT this todo',
                    notes: ''
                },
                {
                    id: '3',
                    complete: true,
                    title: 'This todo is complete! It cannot be edited',
                    notes: ''
                },
                {
                    id: '4',
                    complete: false,
                    title: 'Click the ❌ to delete this todo',
                    notes: ''
                },
                {
                    id: '5',
                    complete: false,
                    title: 'This icon shows that this todo has notes -->',
                    notes: 'You found the notes! Good job. 👍'
                }
            ]
        };

        this.toggleComplete = this.toggleComplete.bind(this);
        this.createTodo = this.createTodo.bind(this);
        this.deleteTodo = this.deleteTodo.bind(this);
        this.editTodo = this.editTodo.bind(this);
    }

    toggleComplete(id) {
        let selectedTodo = this.state.todos.find((todo) => todo.id === id);

        selectedTodo.complete = !selectedTodo.complete;
        this.setState({ todos: this.state.todos });
    }

    createTodo(todo) {
        let todosCopy = this.state.todos.slice();

        todosCopy.push(todo);
        this.setState({ todos: todosCopy });
    }

    editTodo(todo) {
        let todosCopy = this.state.todos.slice();
        let index = todosCopy.findIndex((x) => x.id === todo.id);

        todosCopy[index] = todo;
        this.setState({ todos: todosCopy });
    }

    deleteTodo(id) {
        let newTodos = this.state.todos.filter((todo) => todo.id !== id);

        this.setState({ todos: newTodos });
    }

    render() {
        return (
            <div id="App">
                <Logo />

                <Route
                    exact
                    path="/"
                    render={(props) => (
                        <Todos
                            {...props}
                            todos={this.state.todos}
                            toggleComplete={this.toggleComplete}
                            deleteTodo={this.deleteTodo}
                        />
                    )}
                />
                <Route
                    path="/new"
                    render={(props) => (
                        <TodoForm
                            {...props}
                            todos={this.state.todos}
                            callback={this.createTodo}
                            action="Create"
                        />
                    )}
                />
                <Route
                    path="/edit/:id"
                    render={(props) => (
                        <TodoForm
                            {...props}
                            todos={this.state.todos}
                            callback={this.editTodo}
                            action="Edit"
                        />
                    )}
                />
            </div>
        );
    }
}

export default App;
