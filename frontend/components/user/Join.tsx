import React from 'react';
import { NextPage } from 'next';
import { joinDuplicatedAPI } from '../../lib/api/auth';
import useInput from '../../hooks/useInput';
import styles from '../../styles/Join.module.scss';

const duplicated = async (name: string, value:string) => {
    try {
        const res = await joinDuplicatedAPI({ [name]: value });
        console.log(res);
    } catch (e) {
        console.log(e);
    }
};

const validation = (name: string, value: string) => {
    const idRegExp = /^[a-z][a-z0-9_]{2,19}$/;
    const pwdRegExp = /^[a-z0-9]{4,}$/;
    if (name === 'userId') {
        if (idRegExp.test(value)) {
            duplicated(name, value);
        } else {
            alert('아이디 조건 확인');
        }
    } else if (name === 'password') console.log(value, pwdRegExp.test(value));
};

const onBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    e.target.classList.remove(styles.focus);
    validation(e.target.name, e.target.value);
};

interface InputParams {
    title: string;
    type: string;
    name: string;
    item: {
        value: string;
        onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
        onFocus: (e: React.FocusEvent<HTMLInputElement>) => void;
    };
}

const InputComponent = ({
    title, type, name, item,
}: InputParams) => {
    return (
        <div className={styles.row}>
            <span className={styles.title_row}>{title}</span>
            <input type={type} name={name} {...item} onBlur={(e) => { onBlur(e); }} required />
        </div>
    );
};

const JoinComponent: NextPage = () => {
    const userId = useInput('');
    const password = useInput('');
    const confirmPassword = useInput('');
    const email = useInput('');
    return (
        <main className={styles.content}>
            <h2>회원가입</h2>
            <div className={styles.row_group}>
                <InputComponent title="아이디" type="text" name="userId" item={userId} />
                <InputComponent title="비밀번호" type="password" name="password" item={password} />
                <InputComponent title="비밀번호 확인" type="password" name="confirmPassword" item={confirmPassword} />
                <InputComponent title="이메일" type="email" name="email" item={email} />
                <button type="submit" name="submit" className={styles.submit}>마굿간 가족되기</button>
            </div>
        </main>
    );
};

export default JoinComponent;
