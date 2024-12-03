import { useEffect, useState } from 'react'
import style from './App.module.css'
import Todo from './components/todo'
import { API } from './api/api'
import Form from './components/form';

function App() {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(false);

  const onGetTodos = async (onLoad) => {
    const data = await API.read('todos');
    setTodos(data);
    onLoad(false);
  }

  const onAddTodo = async (todo, onLoad) => {
    const data = await API.create('todos', todo);
    setTodos((prev) => [...prev, data]);
    onLoad();
  }

  const onUpdateTodo = async (todo, onLoad) => {
    const data = await API.update('todos', todo.id, todo);
    setTodos((prev) => prev.map((item) => item.id === todo.id ? data : item));
    onLoad();
  }

  const onDeleteTodo = async (todo, onLoad) => {
    await API.delete('todos', todo.id);
    setTodos((prev) => prev.filter((item) => item.id !== todo.id));
    onLoad();
  }

  useEffect(() => {
    setLoading(true);
    onGetTodos(() => setLoading(false));
  }, [])

  return (
    <div className={style.wrapper}>
      <h1>Список дел</h1>

      <Form onSubmitForm={onAddTodo} />

      {loading ?
        <div>Загрузка...</div>
        :
        <ul className={style.list}>
          {todos.map((todo, index) =>
            <li key={index}>
              <Todo todo={todo} onUpdateTodo={onUpdateTodo} onDeleteTodo={onDeleteTodo} />
            </li>
          )}
        </ul>}

    </div>
  )
}

export default App
