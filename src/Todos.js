import React from 'react';
import Todo from './Todo';

const Todos = (props) => (
    <ul>
        {props.todos.map((todo) => {
            return <Todo key={todo.id} todo={todo} toggleComplete={props.toggleComplete} />
        })}
    </ul>
);

export default Todos;