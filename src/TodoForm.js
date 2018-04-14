// Takes in a todo, callback and action word
// <TodoForm todo={} onComplete={} action='Edit' />

import React from 'react';

const TodoForm = ({ todos, onComplete, action, match, history }) => {
    let todo = todos.find((todo) => todo.id === match.params.id) || { title: '', notes: ''};

    return (
        <div className='new-todo'>
            <div>
                <label htmlFor='title'>Title</label>
                <input type='text' name='title' defaultValue={todo.title}/>
            </div>
            <div>
                <label htmlFor='notes'>Notes</label>
                <textarea name='notes' placeholder='Enter notes' defaultValue={todo.notes} />
            </div>
            <button onClick={(e) => onComplete(e, history, match.params.id)}>{action}</button>
            <button onClick={() => history.push('/')}>Cancel</button>
        </div>
    );
};

export default TodoForm;