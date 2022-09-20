import React, { useState } from 'react';
import { NextPage } from 'next';
import { joinDuplicatedAPI } from '../../lib/api/join';
import useInputs from '../../hooks/useInputs';
import JoinComponent from '../../components/user/Join';

const duplicated = async (name: string, value:string) => {
    try {
        const res = await joinDuplicatedAPI({ [name]: value });
        return res.statusText;
    } catch (e) {
        console.log(e);
    }
};

const validation = (name: string, value: string, value2?: string) => {
    const idRegExp = /^[a-z][a-z0-9_]{2,19}$/;
    const pwdRegExp = /^[a-z0-9]{4,}$/;
    const emailRegExp = /^[A-Za-z0-9_!#$%&'*+/=?`{|}~^.-]+@[A-Za-z0-9.-]+$/gm;

    if (name === 'userId') {
        if (idRegExp.test(value)) return duplicated(name, value);
    } else if (name === 'email') {
        if (emailRegExp.test(value)) return duplicated(name, value);
    } else if (name === 'password') return pwdRegExp.test(value);
    else if (name === 'confirmPassword') return (value !== '' && value === value2);
};

const JoinContainer: NextPage = () => {
    const [state, onChange, onDeleteBtnClick] = useInputs({
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

    const [isValid, setIsValid] = useState({
        userId: false,
        password: false,
        confirmPassword: false,
        email: false,
    });

    const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
        e.target.classList.add('active');
        setIsValid({ ...isValid, [e.target.name]: false });
    };

    const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
        const { name, value, classList } = e.target;
        classList.remove('focus', 'error');

        let result;
        if (name === 'confirmPassword') result = validation(name, value, password);
        else result = validation(name, value);

        if (typeof (result) === 'object') {
            result.then((r) => {
                if (r !== 'OK') {
                    if (name === 'userId') setErrors({ ...errors, [name]: '이미 사용중인 아이디에요.' });
                    else if (name === 'email') setErrors({ ...errors, [name]: '이미 가입된 이메일이에요.' });
                } else setIsValid({ ...isValid, [name]: true });
            });
        } else if (!result) {
            if (name === 'userId') setErrors({ ...errors, [name]: '3~20자 이내의 영문, 숫자, _만 사용해서 입력해 주세요.' });
            if (name === 'password') setErrors({ ...errors, [name]: '4자 이상 입력해 주세요.' });
            if (name === 'confirmPassword') setErrors({ ...errors, [name]: '비밀번호를 다시 입력해 주세요.' });
            if (name === 'email') setErrors({ ...errors, [name]: '올바른 이메일을 입력해 주세요.' });
            classList.add('error');
        } else {
            setErrors({ ...errors, [name]: '' });
            setIsValid({ ...isValid, [name]: true });
        }
    };

    return (
        <JoinComponent
            items={{
                userIdItem: { value: userId, placeholder: '3~20자 이내로 입력해 주세요.' },
                passwordItem: { type: 'password', value: password, placeholder: '4자 이상 입력해 주세요.' },
                confirmPasswordItem: { type: 'password', value: confirmPassword, placeholder: '비밀번호를 다시 입력해 주세요.' },
                emailItem: { type: 'email', value: email, placeholder: '이메일을 입력해 주세요.' },
            }}
            errors={errors}
            isValid={isValid}
            onChange={onChange}
            onFocus={handleFocus}
            onBlur={handleBlur}
            onDeleteBtnClick={onDeleteBtnClick}
        />
    );
};

export default JoinContainer;
