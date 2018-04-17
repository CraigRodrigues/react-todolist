import React from 'react';
import { Route, Switch } from 'react-router-dom';
import clonedeep from 'lodash.clonedeep';
import { db } from './firebase';

import TodosList from './TodosList';
import TodoForm from './TodoForm';
import NotFound from './NotFound';

// [{
//     id: '1',
//     complete: false,
//     title: 'This is a sample Todo',
//     notes: ''
// },
// {
//     id: '2',
//     complete: false,
//     title: 'Click here to EDIT this todo',
//     notes: ''
// },
// {
//     id: '3',
//     complete: true,
//     title: 'This todo is complete! It cannot be edited',
//     notes: ''
// },
// {
//     id: '4',
//     complete: false,
//     title: 'Click any ❌ emoji to delete a todo',
//     notes: ''
// },
// {
//     id: '5',
//     complete: false,
//     title: 'This icon shows that this todo has notes -->',
//     notes: 'You found the notes! Good job. 👍'
// }]

export default class TodosContainer extends React.Component {
    constructor(props) {
        super(props);

        this.state = { todos: null };

        this.toggleComplete = this.toggleComplete.bind(this);
        this.createTodo = this.createTodo.bind(this);
        this.deleteTodo = this.deleteTodo.bind(this);
        this.editTodo = this.editTodo.bind(this);
    }

    componentDidMount() {
        this.fetchTodos();
    }

    fetchTodos() {
        let myTodos = db.collection('todos').doc('craigs-todos');

        myTodos
            .get()
            .then((doc) => {
                if (doc.exists) {
                    this.setState({ todos: doc.data().todos });
                } else {
                    console.error('No document found');
                }
            })
            .catch((error) => {
                console.error('Error getting document', error);
            });
    }

    toggleComplete(id) {
        this.setState({ loading: true }, () => {
            let selectedTodo = this.state.todos.find((todo) => todo.id === id);
            let myTodos = db.collection('todos').doc('craigs-todos');

            selectedTodo.complete = !selectedTodo.complete;
            myTodos.update({ todos: this.state.todos }).then(() => {
                console.log('Document successfully updated!');
                this.setState({ todos: this.state.todos });
            });
        });
    }

    createTodo(todo) {
        this.setState({ loading: true }, () => {
            let todosCopy = clonedeep(this.state.todos);
            let myTodos = db.collection('todos').doc('craigs-todos');

            todosCopy.push(todo);
            myTodos.update({ todos: todosCopy }).then(() => {
                console.log('Document successfully updated!');
                this.setState({ todos: todosCopy });
            });
        });
    }

    editTodo(todo) {
        this.setState({ loading: true }, () => {
            let todosCopy = clonedeep(this.state.todos);
            let index = todosCopy.findIndex((x) => x.id === todo.id);
            let myTodos = db.collection('todos').doc('craigs-todos');

            todosCopy[index] = todo;
            myTodos.update({ todos: todosCopy }).then(() => {
                console.log('Document successfully updated!');
                this.setState({ todos: todosCopy });
            });
        });
    }

    deleteTodo(id) {
        this.setState({ loading: true }, () => {
            let newTodos = this.state.todos.filter((todo) => todo.id !== id);
            let myTodos = db.collection('todos').doc('craigs-todos');

            myTodos.update({ todos: newTodos }).then(() => {
                console.log('Document successfully updated!');
                this.setState({ todos: newTodos });
            });
        });
    }

    render() {
        return (
            <React.Fragment>
                <Switch>
                <Route
                    exact
                    path="/"
                    render={(props) => (
                        <TodosList
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
                <Route component={NotFound} />
                </Switch>
            </React.Fragment>
        );
    }
}
