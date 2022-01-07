import logo from './logo.svg';
import './App.css';
import { useState } from 'react';

const cardsList = [
  {
    description: 'Relax on the beach',
    column: 'todo'
  },
  {
    description: 'Go for a walk',
    column: 'todo'
  },
  {
    description: 'Take a deep breath',
    column: 'todo'
  },
  {
    description: 'Grab some water',
    column: 'todo'
  },
  {
    description: 'Write the components',
    column: 'in_progress'
  },
  {
    description: 'Test the hypothesis',
    column: 'in_progress'
  },
  {
    description: 'Draw a mockup',
    column: 'done'
  },
  {
    description: 'Ace the interview',
    column: 'done'
  }
];

const App = () => {
  return <TrelloBoard />;
};

const Todo = ({ tasks, title, addTodo, moveTodo }) => {
  const [text, setText] = useState('');

  return (
    <div className='column'>
      <h1>{title}</h1>
      <ul>
        {tasks.map((task, i) => {
          return (
            <li onClick={() => console.log(i)} key={task + i}>
              {task.description}
              <button onClick={() => moveTodo(tasks, i, 'up', title)}>
                Up
              </button>
              <button onClick={() => moveTodo(tasks, i, 'down', title)}>
                Down
              </button>
            </li>
          );
        })}
      </ul>

      <input type='text' value={text} onChange={e => setText(e.target.value)} />
      <button
        onClick={() => {
          addTodo(text);
          setText('');
        }}
      >
        {' '}
        Add{' '}
      </button>
    </div>
  );
};

function swap(arr, i, j) {
  const temp = arr[i];
  arr[i] = arr[j];
  arr[j] = temp;
}

const TrelloBoard = () => {
  const todosArr = cardsList.filter(task => task.column === 'todo');
  const [todos, setTodos] = useState(todosArr);
  const inprogressArr = cardsList.filter(task => task.column === 'in_progress');
  const [inprogress, setInprogress] = useState(inprogressArr);
  const doneArr = cardsList.filter(task => task.column === 'done');
  const [done, setDone] = useState(doneArr);

  const moveTodo = (arr, index, direction, title) => {
    console.log(title);
    const arrCopy = [...arr];
    if (direction === 'up') {
      if (index === 0) return;
      swap(arrCopy, index, index - 1);
      if (title === 'Todo') {
        setTodos(arrCopy);
      }
      if (title === 'In Progress') {
        setInprogress(arrCopy);
      }
      if (title === 'Done') {
        setDone(arrCopy);
      }
    } else {
      if (index === arrCopy.length - 1) return;
      swap(arrCopy, index, index + 1);
      if (title === 'Todo') {
        setTodos(arrCopy);
      }
      if (title === 'In Progress') {
        setInprogress(arrCopy);
      }
      if (title === 'Done') {
        setDone(arrCopy);
      }
    }
  };

  const addTodo = text => {
    const updatedArr = [...todos, { description: text, column: 'todo' }];
    setTodos(updatedArr);
  };
  const addInProgress = text => {
    const updatedArr = [
      ...inprogress,
      { description: text, column: 'in_progress' }
    ];
    setInprogress(updatedArr);
  };
  const addDone = text => {
    const updatedArr = [...done, { description: text, column: 'done' }];
    setDone(updatedArr);
  };

  return (
    <div className='row'>
      {/* {JSON.stringify(cardsList)} */}

      {/* {`Hello future Mod Squad member! Let's build something great together!`} */}

      <Todo tasks={todos} title='Todo' addTodo={addTodo} moveTodo={moveTodo} />
      <Todo
        tasks={inprogress}
        title='In Progress'
        addTodo={addInProgress}
        moveTodo={moveTodo}
      />
      <Todo tasks={done} title='Done' addTodo={addDone} moveTodo={moveTodo} />
    </div>
  );
};

export default App;
