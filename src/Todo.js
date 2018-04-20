import React from 'react';

const Todo = ({ toggleComplete, deleteTodo, todo, history }) => {
    const handleClick = () => {
        if (!todo.complete) {
            // history passed down as props to this component
            return history.push(`/edit/${todo.id}`);
        }
    };

    return (
        <li>
            <input
                type="checkbox"
                checked={todo.complete}
                onChange={() => toggleComplete(todo.id)}
            />
            <span className={todo.complete ? 'complete' : ''} onDoubleClick={handleClick}>
                {todo.title}
            </span>
            {todo.notes && (
                <span role="img" aria-label="notes">
                    📝
                </span>
            )}
            <span role="img" aria-label="delete" onClick={() => deleteTodo(todo.id)}>
                ❌
            </span>
        </li>
    );
};

export default Todo;
