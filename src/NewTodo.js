import React from 'react';

const NewTodo = () => (
    <div className='new-todo'>
        <div>
            <label htmlFor='title'>Title</label>
            <input type='text' name='title' />
        </div>
        <div>
            <label htmlFor='notes'>Notes</label>
            <textarea name='notes' placeholder='Enter notes' />
        </div>
        <button>Create</button>
    </div>
);

export default NewTodo;