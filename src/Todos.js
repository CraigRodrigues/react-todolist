import React from 'react';
import Todo from './Todo';
import { Link } from 'react-router-dom';

const Todos = ({ loading, todos, toggleComplete, deleteTodo, history }) => (
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

export default Todos;
