import React from 'react';

const Todo = ({toggleComplete, todo}) => (
    <li>
        <input type='checkbox' onChange={() => toggleComplete(todo.id)}/>
        {todo.completed ? <span className='completed'>{todo.title}</span> : <span>{todo.title}</span>}
    </li>
);

export default Todo;