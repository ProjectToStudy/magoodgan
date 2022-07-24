import React, { useState } from 'react';
import styles from '../styles/Join.module.scss';

const useInput = (input: string) => {
    const [value, setValue] = useState(input);
    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setValue(e.target.value);
    };
    const onFocus = (e: React.FocusEvent<HTMLInputElement>) => {
        e.target.classList.add(styles.focus);
    };
    return { value, onChange, onFocus };
};

export default useInput;
