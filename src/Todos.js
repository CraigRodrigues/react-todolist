import React from 'react';
import Todo from './Todo';
import { Link } from 'react-router-dom';

const Todos = (props) => (
    <React.Fragment>
        <ul>
            {props.todos.map((todo) => {
                return <Todo
                    key={todo.id}
                    todo={todo}
                    toggleComplete={props.toggleComplete}
                    deleteTodo={props.deleteTodo}
                    history={props.history}
                    />
            })}
        </ul>
        <Link to='/new'>
            <button>Create New Todo</button>
        </Link>
    </React.Fragment>
);

export default Todos;