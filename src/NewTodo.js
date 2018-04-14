import React from 'react';

const NewTodo = (props) => (
    <div className='new-todo'>
        <div>
            <label htmlFor='title'>Title</label>
            <input type='text' name='title' />
        </div>
        <div>
            <label htmlFor='notes'>Notes</label>
            <textarea name='notes' placeholder='Enter notes' />
        </div>
        <button onClick={(e) => props.createTodo(e, props.history)}>Ok</button>
        <button onClick={() => props.history.push('/')}>Cancel</button>
    </div>
);

export default NewTodo;