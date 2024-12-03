import { useState } from 'react'
import style from './style.module.css';
import clsx from 'clsx';

const Todo = ({ todo, onUpdateTodo, onDeleteTodo }) => {
    const [loading, setLoading] = useState(false);
    const date = `${new Date(todo.updated_at).toLocaleTimeString('ru-RU', { day: '2-digit', month: '2-digit', hour: '2-digit', minute: '2-digit' })}`;

    const onUpdate = () => {
        setLoading(true);
        onUpdateTodo({ ...todo, completed: !todo.completed }, () => setLoading(false));
    }
    const onDelete = () => {
        setLoading(true);
        onDeleteTodo(todo, () => setLoading(false));
    };

    return (
        <div className={style.item}>
            {loading && <div className={style.loader}>Загрузка...</div>}

            <div disabled={loading} className={style.wrapper}>
                <div className={style.date}>{date}</div>
                <div className={clsx(style.todo, todo.completed && style['todo--completed'])}>{todo.todo}</div>
                <button onClick={onUpdate}>{todo.completed ? 'Вернуть' : 'Выполнить'}</button>
                <button onClick={onDelete}>Удалить</button>
            </div>
        </div>
    )
}

export default Todo;