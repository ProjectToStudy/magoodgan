import { useState, FocusEvent } from 'react';
import { useRecoilValue } from 'recoil';
import useInputs from '../../hooks/useInputs';
import { loginPostAPI } from '../../modules/api/user';
import { loginState } from '../../modules/state/user';
import LoginComponent from '../../components/user/Login';

const LoginContainer = () => {
    const [state, onChange, onDeleteBtnClick] = useInputs({
        userId: '', password: '',
    });
    const [isFocus, setIsFocus] = useState({
        userId: false, password: false,
    });
    const [errors, setErrors] = useState({
        userId: '', password: '',
    });

    const { userId, password } = state;

    const loginAPIState = useRecoilValue(loginState);

    const loginAPI = loginPostAPI({ uid: userId, password });

    const onFocus = (e: FocusEvent<HTMLInputElement>) => {
        const { name } = e.target;
        setIsFocus({ ...isFocus, [name]: true });
    };

    const onBlur = (e: FocusEvent<HTMLInputElement>) => {
        const { name } = e.target;
        setIsFocus({ ...isFocus, [name]: false });
    };

    const onSubmit = () => {
        if (userId !== '' && password !== '') loginAPI();
    };

    return (
        <LoginComponent
            inputValue={state}
            isFocus={isFocus}
            onFocus={onFocus}
            onBlur={onBlur}
            onInputChange={onChange}
            onDelBtnClick={onDeleteBtnClick}
            onSubmit={onSubmit}
        />
    );
};

export default LoginContainer;
