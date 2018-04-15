import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import clonedeep from 'lodash.clonedeep';

import Logo from './Logo';
import Todos from './Todos';
import TodoForm from './TodoForm';
import firebase from 'firebase/app';
import 'firebase/firestore';

class App extends Component {
    constructor() {
        super();

        firebase.initializeApp({
            apiKey: 'AIzaSyCGdhuTK5prBXGTfyIJ3wR8p-e2GDX3Aok',
            authDomain: 'react-todo-list-5b50c.firebaseapp.com',
            projectId: 'react-todo-list-5b50c'
        });

        this.db = firebase.firestore();
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
                    title: 'Click any ❌ emoji to delete a todo',
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

    componentDidMount() {
        let myTodos = this.db.collection('todos').doc('craigs-todos');

        myTodos
            .get()
            .then((doc) => {
                if (doc.exists) {
                    console.log(doc.data());
                    this.setState(doc.data());
                } else {
                    console.error('No document found');
                }
            })
            .catch((error) => {
                console.error('Error getting document', error);
            });
    }

    toggleComplete(id) {
        let selectedTodo = this.state.todos.find((todo) => todo.id === id);

        selectedTodo.complete = !selectedTodo.complete;

        let myTodos = this.db.collection('todos').doc('craigs-todos');
        myTodos
            .update({
                todos: this.state.todos
            })
            .then(() => {
                console.log('Document successfully updated!');
                this.setState({ todos: this.state.todos });
            });
    }

    createTodo(todo) {
        let todosCopy = clonedeep(this.state.todos);
        todosCopy.push(todo);

        let myTodos = this.db.collection('todos').doc('craigs-todos');
        myTodos
            .update({
                todos: todosCopy
            })
            .then(() => {
                console.log('Document successfully updated!');
                this.setState({ todos: todosCopy });
            });
    }

    editTodo(todo) {
        let todosCopy = clonedeep(this.state.todos);
        let index = todosCopy.findIndex((x) => x.id === todo.id);

        todosCopy[index] = todo;

        let myTodos = this.db.collection('todos').doc('craigs-todos');
        myTodos
            .update({
                todos: todosCopy
            })
            .then(() => {
                console.log('Document successfully updated!');
                this.setState({ todos: todosCopy });
            });
    }

    deleteTodo(id) {
        let newTodos = this.state.todos.filter((todo) => todo.id !== id);

        let myTodos = this.db.collection('todos').doc('craigs-todos');
        myTodos
            .update({
                todos: newTodos
            })
            .then(() => {
                console.log('Document successfully updated!');
                this.setState({ todos: newTodos });
            });
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
                            action="Create New Todo"
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
                            action="Edit Todo"
                        />
                    )}
                />
            </div>
        );
    }
}

export default App;
