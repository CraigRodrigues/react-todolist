import React from 'react';
import { Route, Switch } from 'react-router-dom';
import clonedeep from 'lodash.clonedeep';
import { db } from './firebase';

import TodosList from './TodosList';
import TodoForm from './TodoForm';
import NotFound from './NotFound';

export default class TodosContainer extends React.Component {
    constructor(props) {
        super(props);

        this.state = { todos: null };

        // hold reference to document of todos
        this.todosRef = db.collection('todos').doc('craigs-todos');

        this.toggleComplete = this.toggleComplete.bind(this);
        this.createTodo = this.createTodo.bind(this);
        this.deleteTodo = this.deleteTodo.bind(this);
        this.editTodo = this.editTodo.bind(this);
    }

    componentDidMount() {
        // setup listener to react to any get() or update() to the todos
        this.todosRef.onSnapshot(
            (doc) => {
                if (doc.exists) {
                    this.setState({ todos: doc.data().todos });
                } else {
                    console.error('No document found');
                }
            },
            (error) => {
                console.error('Snapshot Error', error);
            }
        );
    }

    // general purpose function to update the todos doc in firestore
    updateTodos(todos) {
        this.todosRef
            .update({ todos })
            .catch((error) => console.error('Error updating document', error));
    }

    toggleComplete(id) {
        let todosCopy = clonedeep(this.state.todos);
        let selectedTodo = todosCopy.find((todo) => todo.id === id);

        selectedTodo.complete = !selectedTodo.complete;
        this.updateTodos(todosCopy);
    }

    createTodo(todo) {
        let todosCopy = clonedeep(this.state.todos);

        todosCopy.push(todo);
        this.updateTodos(todosCopy);
    }

    editTodo(todo) {
        let todosCopy = clonedeep(this.state.todos);
        let index = todosCopy.findIndex((x) => x.id === todo.id);

        todosCopy[index] = todo;
        this.updateTodos(todosCopy);
    }

    deleteTodo(id) {
        let todosCopy = clonedeep(this.state.todos);
        let newTodos = todosCopy.filter((todo) => todo.id !== id);

        this.updateTodos(newTodos);
    }

    render() {
        return (
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
        );
    }
}
