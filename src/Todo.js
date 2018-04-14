import React from 'react';

const Todo = ({ toggleComplete, deleteTodo, todo, history }) => {
    return (
        <li>
            <input type="checkbox" onChange={() => toggleComplete(todo.id)} />
            <span
                className={todo.completed ? 'completed' : ''}
                onClick={() => history.push(`/edit/${todo.id}`)}
            >
                {todo.title}
            </span>
            { todo.notes && <span role="img" aria-label="notes">📝</span> }
            <span role="img" aria-label="delete" onClick={() => deleteTodo(todo.id)}>
                ❌
            </span>
        </li>
    );
};

export default Todo;
