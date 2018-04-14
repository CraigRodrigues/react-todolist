import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import shortid from 'shortid';
import './App.css';

import Logo from './Logo';
import Todos from './Todos';
import NewTodo from './NewTodo';
import TodoForm from './TodoForm';

class App extends Component {
    constructor() {
        super();

        this.state = {
            todos: [
                {
                    id: '1',
                    completed: false,
                    title: 'Example Todo',
                    notes: 'This is an example todo!'
                },
                {
                    id: '2',
                    completed: false,
                    title: 'Example Todo 2',
                    notes: 'This is an example todo too!'
                },
                {
                    id: '3',
                    completed: false,
                    title: 'Example Todo 3',
                    notes: 'Three is an example todo!'
                }
            ]
        };

        this.toggleComplete = this.toggleComplete.bind(this);
        this.createTodo = this.createTodo.bind(this);
        this.deleteTodo = this.deleteTodo.bind(this);
        this.editTodo = this.editTodo.bind(this);
        this.renderTodos = this.renderTodos.bind(this);
    }

    toggleComplete(id) {
        let selectedTodo = this.state.todos.find((todo) => todo.id === id);

        selectedTodo.completed = !selectedTodo.completed;
        this.setState({ todos: this.state.todos });
    }

    createTodo(e, history) {
        let todosCopy = this.state.todos.slice();
        let title = document.getElementsByName('title')[0].value;
        let notes = document.getElementsByName('notes')[0].value;

        let todo = {
            id: shortid.generate(),
            completed: false,
            title,
            notes
        };

        todosCopy.push(todo);
        this.setState({ todos: todosCopy });
        history.push('/');
    }

    editTodo(e, history, id) {
        let todosCopy = this.state.todos.slice();
        let todo = todosCopy.find((todo) => todo.id === id);
        let title = document.getElementsByName('title')[0].value;
        let notes = document.getElementsByName('notes')[0].value;

        todo.title = title;
        todo.notes = notes;

        this.setState({ todos: todosCopy });
        history.push('/');
    }

    deleteTodo(id) {
        let newTodos = this.state.todos.filter((todo) => todo.id !== id);

        this.setState({ todos: newTodos });
    }

    renderTodos(props) {
        return <Todos
                {...props}
                todos={this.state.todos}
                toggleComplete={this.toggleComplete} 
                deleteTodo={this.deleteTodo}
                />;
    }

    render() {
        return (
            <div id="App">
                <Logo />

                <Route exact path='/'
                    render={this.renderTodos} />
                <Route path='/new'
                    render={(props => <NewTodo {...props} createTodo={this.createTodo} />)} />
                <Route path='/edit/:id'
                    render={(props => <TodoForm {...props} todos={this.state.todos} onComplete={this.editTodo} action='Edit'/>)}
                />
            </div>
        );
    }
}

export default App;
