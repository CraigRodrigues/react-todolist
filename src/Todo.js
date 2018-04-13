import React from 'react';

const Todo = (props) => (
    <li>
        <input type='checkbox' />
        {props.title}
    </li>
);

export default Todo;