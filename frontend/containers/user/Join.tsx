import React, { useState } from 'react';
import { NextPage } from 'next';
import { joinDuplicatedAPI } from '../../lib/api/join';
import useInputs from '../../hooks/useInputs';
import JoinComponent from '../../components/user/Join';

const duplicated = async (name: string, value:string) => {
    try {
        const res = await joinDuplicatedAPI({ [name]: value });
        return false;
    } catch (e) {
        console.log(e);
    }
};

const validation = (name: string, value: string, value2?: string) => {
    const idRegExp = /^[a-z][a-z0-9_]{2,19}$/;
    const pwdRegExp = /^[a-z0-9]{4,}$/;
    const emailRegExp = /^[A-Za-z0-9_!#$%&'*+/=?`{|}~^.-]+@[A-Za-z0-9.-]+$/gm;

    switch (name) {
    case 'userId':
        if (idRegExp.test(value)) return duplicated(name, value);
        break;
    case 'password':
        return pwdRegExp.test(value);
    case 'confirmPassword':
        return (value === value2);
    case 'email':
        if (emailRegExp.test(value)) return duplicated(name, value);
        break;
    default:
        return false;
    }
};

const JoinContainer: NextPage = () => {
    const [state, onChange, onFocus] = useInputs({
        userId: '',
        password: '',
        confirmPassword: '',
        email: '',
    });

    const { userId, password, confirmPassword, email } = state;

    const [errors, setErrors] = useState({
        userId: '',
        password: '',
        confirmPassword: '',
        email: '',
    });

    const onBlur = (e: React.FocusEvent<HTMLInputElement>) => {
        const { name, value, classList } = e.target;
        classList.remove('focus', 'error');

        let result;
        if (name === 'confirmPassword') result = validation(name, value, password);
        else result = validation(name, value);

        if (!result) {
            if (name === 'userId') setErrors({ ...errors, [name]: '3~20자 이내로 입력해 주세요.' });
            else if (name === 'password') setErrors({ ...errors, [name]: '4자 이상 입력해 주세요.' });
            else if (name === 'confirmPassword') setErrors({ ...errors, [name]: '비밀번호를 다시 입력해 주세요.' });
            else if (name === 'email') setErrors({ ...errors, [name]: '올바른 이메일을 입력해 주세요.' });
            classList.add('error');
        } else setErrors({ ...errors, [name]: '' });
    };

    return (
        <JoinComponent
            items={{
                userIdItem: { value: userId, onChange, onFocus, onBlur },
                passwordItem: { type: 'password', value: password, onChange, onFocus, onBlur },
                confirmPasswordItem: { type: 'password', value: confirmPassword, onChange, onFocus, onBlur },
                emailItem: { type: 'email', value: email, onChange, onFocus, onBlur },
            }}
            errors={errors}
        />
    );
};

export default JoinContainer;
