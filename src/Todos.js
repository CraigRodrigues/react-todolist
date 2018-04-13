import React from 'react';
import Todo from './Todo';

const Todos = (props) => (
    <ul>
        {props.todos.map((todo) => {
            return <Todo key={todo.id} title={todo.title} completed={todo.completed} />
        })}
    </ul>
);

export default Todos;