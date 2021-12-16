import React from 'react';

const Todo = ({ tasks }) => {

  return (
    <div>
      <p>Project tasks</p>
      {
        tasks.map(task => {
          return ([
            <input key={task.id} type='checkbox' name='task'></input>,
            <label key={task.id+'label'} htmlFor='task'>{task.task}</label>
          ])
        })
      }
    </div>
  )
};

export default Todo;
