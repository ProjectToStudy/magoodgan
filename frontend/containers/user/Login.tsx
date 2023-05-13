import { useState, FocusEvent, useEffect } from 'react';
import { useRecoilValue, useResetRecoilState, useSetRecoilState } from 'recoil';
import Router from 'next/router';
import useInputs from '../../hooks/useInputs';
import { loginPostAPI } from '../../modules/api/user';
import { loginState, user } from '../../modules/state/user';
import LoginComponent from '../../components/user/Login';
import Modal from '../../components/organisms/Modal';

const LoginContainer = () => {
    const [state, onChange, onDeleteBtnClick] = useInputs({
        userId: '', password: '',
    });
    const [isFocus, setIsFocus] = useState({
        userId: false, password: false,
    });
    const [isValid, setIsValid] = useState({
        userId: false, password: false,
    });
    const [errors, setErrors] = useState({
        userId: '', password: '',
    });

    const { userId, password } = state;

    const loginAPIState = useRecoilValue(loginState);
    const resetLoginAPIState = useResetRecoilState(loginState);
    const setUser = useSetRecoilState(user);

    const loginAPI = loginPostAPI({ uid: userId, password });

    const idRegExp = /^[a-z][a-z0-9_]{2,19}$/;
    const pwdRegExp = /^[a-z0-9]{4,}$/;

    const onFocus = (e: FocusEvent<HTMLInputElement>) => {
        const { name } = e.target;
        setIsValid({ ...isValid, [name]: false });
        setIsFocus({ ...isFocus, [name]: true });
    };

    const onBlur = (e: FocusEvent<HTMLInputElement>) => {
        const { name } = e.target;
        if (name === 'userId') {
            if (idRegExp.test(userId)) {
                setIsFocus({ ...isFocus, userId: false });
                setErrors({ ...errors, userId: '' });
                setIsValid({ ...isValid, userId: true });
            } else setErrors({ ...errors, userId: '3~20자 이내로 입력해 주세요.' });
        } else if (name === 'password') {
            if (pwdRegExp.test(password)) {
                setIsFocus({ ...isFocus, password: false });
                setErrors({ ...errors, password: '' });
                setIsValid({ ...isValid, password: true });
            } else setErrors({ ...errors, password: '4자 이상 입력해 주세요.' });
        }
    };

    const onSubmit = () => {
        if (isValid.userId && isValid.password) loginAPI();
    };

    useEffect(() => {
        if (userId === '' && isFocus.userId) setIsFocus({ ...isFocus, userId: false });
    }, [userId]);

    useEffect(() => {
        if (password === '' && isFocus.password) setIsFocus({ ...isFocus, password: false });
    }, [password]);

    useEffect(() => {
        const { success, fail } = loginAPIState;
        if (success) {
            setUser(success.result.uid);
            window.localStorage.setItem('AT', success.result.access_token);
            Router.push('/');
        }
    }, [loginAPIState]);

    return (
        <>
            <LoginComponent
                inputValue={state}
                isFocus={isFocus}
                isValid={isValid}
                error={errors}
                onFocus={onFocus}
                onBlur={onBlur}
                onInputChange={onChange}
                onDelBtnClick={onDeleteBtnClick}
                onSubmit={onSubmit}
            />
            {loginAPIState.fail && <Modal onConfirmClick={resetLoginAPIState} />}
        </>
    );
};

export default LoginContainer;
