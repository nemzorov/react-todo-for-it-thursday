import { useState } from "react";
import style from './style.module.css';


const Form = ({ onSubmitForm }) => {
    const [value, setValue] = useState('');
    const [loading, setLoading] = useState(false);

    const onInput = (e) => setValue(e.target.value);
    const onSubmit = () => {
        setLoading(true);
        onSubmitForm({ todo: value }, () => setLoading(false))
        setValue('');
    };

    return (
        <div className={style.form}>
            {loading && <div className={style.loader}>Загрузка...</div>}
            <div disabled={loading} className={style.wrapper}>
                <input type="text" value={value} onInput={onInput} />
                <button disabled={!value.length} onClick={onSubmit}>Добавить</button>
            </div>
        </div>
    )
}

export default Form;