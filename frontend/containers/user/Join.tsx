import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useRecoilState } from 'recoil';
import { idDuplicatedPostAPI, joinPostAPI } from '../../modules/api/user';
import { idDuplicatedState, joinState } from '../../modules/state/user';
import useInputs from '../../hooks/useInputs';
import JoinComponent from '../../components/user/Join';

const JoinContainer = () => {
    const router = useRouter();

    const [state, onChange, onDeleteBtnClick] = useInputs({
        userId: '', password: '', confirmPassword: '', email: '',
    });

    const [errors, setErrors] = useState({
        userId: '', password: '', confirmPassword: '', email: '',
    });

    const [isValid, setIsValid] = useState({
        userId: false, password: false, confirmPassword: false, email: false,
    });

    const { userId, password, confirmPassword, email } = state;

    const idDuplicatedAPI = idDuplicatedPostAPI(userId);
    const joinAPI = joinPostAPI({ uid: userId, password, email });
    const [idDuplicatedAPIState, _] = useRecoilState(idDuplicatedState);
    const [joinAPIState] = useRecoilState(joinState);

    const idRegExp = /^[a-z][a-z0-9_]{2,19}$/;
    const pwdRegExp = /^[a-z0-9]{4,}$/;
    const emailRegExp = /^[A-Za-z0-9_!#$%&'*+/=?`{|}~^.-]+@[A-Za-z0-9.-]+$/gm;

    useEffect(() => {
        if (idDuplicatedAPIState.success) setErrors({ ...errors, userId: '' });
        if (idDuplicatedAPIState.fail) setErrors({ ...errors, userId: '이미 사용중인 아이디에요.' });
    }, [idDuplicatedAPIState]);

    useEffect(() => {
        if (joinAPIState.success) router.push('/');
        if (joinAPIState.fail) alert('fail');
    }, [joinAPIState]);

    const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
        e.target.classList.add('active');
        setIsValid({ ...isValid, [e.target.name]: false });
    };

    const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
        const { name, value, classList } = e.target;
        classList.remove('focus', 'error');

        if (name === 'userId') {
            if (idRegExp.test(value)) idDuplicatedAPI();
            else setErrors({ ...errors, [name]: '3~20자 이내의 영문, 숫자, _만 사용해서 입력해 주세요.' });
        } else if (name === 'password') {
            if (!pwdRegExp.test(value)) setErrors({ ...errors, [name]: '4자 이상 입력해 주세요.' });
            else setErrors({ ...errors, [name]: '' });
        } else if (name === 'confirmPassword') {
            if (value !== password) setErrors({ ...errors, [name]: '비밀번호를 다시 입력해 주세요.' });
            else setErrors({ ...errors, [name]: '' });
        } else if (name === 'email') {
            if (emailRegExp.test(value)) setErrors({ ...errors, [name]: '' });
            // setErrors({ ...errors, [name]: '이미 가입된 이메일이에요.' });
            else setErrors({ ...errors, [name]: '올바른 이메일을 입력해 주세요.' });
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
            onSubmitClick={joinAPI}
        />
    );
};

export default JoinContainer;
