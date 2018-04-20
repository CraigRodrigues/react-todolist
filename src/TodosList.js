import React from 'react';
import Todo from './Todo';
import { Link } from 'react-router-dom';

const TodosList = ({ todos, toggleComplete, deleteTodo, history }) => {
    if (todos) {
        return (
            <React.Fragment>
                <ul>
                    {todos.map((todo) => {
                        return (
                            <Todo
                                key={todo.id}
                                todo={todo}
                                toggleComplete={toggleComplete}
                                deleteTodo={deleteTodo}
                                history={history}
                            />
                        );
                    })}
                </ul>
                <Link to="/new">
                    <button>Create New Todo</button>
                </Link>
            </React.Fragment>
        );
    } else {
        return <div>Fetching todos...</div>;
    }
};

export default TodosList;
