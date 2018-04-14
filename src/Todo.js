import React from 'react';

const Todo = ({ toggleComplete, deleteTodo, todo, history }) => {
    const handleClick = (event) => {
        event.stopPropagation();

        if (!todo.completed) {
            return history.push(`/edit/${todo.id}`);
        }

        return false;
    }

    return (
        <li>
            <input type="checkbox" onChange={() => toggleComplete(todo.id)} />
            <span
                className={todo.completed ? 'completed' : ''}
                onClick={handleClick}
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
