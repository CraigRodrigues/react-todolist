import React from 'react';

const Todo = ({toggleComplete, deleteTodo, todo, history}) => {

    let completedClass = todo.completed ? 'completed' : '';

    return (
        <li>
            <input type='checkbox'
                onChange={() => toggleComplete(todo.id)}/>
            <span className={completedClass}
                onClick={() => history.push(`/edit/${todo.id}`)}>{todo.title}</span>
            <span role='img'
                aria-label='delete'
                onClick={() => deleteTodo(todo.id)}>❌</span>
        </li>
    );
};

export default Todo;