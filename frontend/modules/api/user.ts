import { useRecoilState } from 'recoil';
import { useMutation } from '@tanstack/react-query';
import axios from '.';
import { duplicatedState, joinState, loginState } from '../state/user';
import { JoinAPIBody, loginAPIBody } from '../../types/user';

const idDuplicated = async (id: string) => {
    const { data } = await axios.post('/check/id', { uid: id });
    return data;
};

const emailDuplicated = async (email: string) => {
    const { data } = await axios.post('/check/email', { email });
    return data;
};

export const duplicatedPostAPI = (type: 'id' | 'email', param: string) => {
    const [state, setState] = useRecoilState(duplicatedState);

    const { mutate } = useMutation(() => (type === 'id' ? idDuplicated(param) : emailDuplicated(param)), {
        retry: false,
        onSuccess: (data) => {
            setState({ ...state, [type]: { success: data, fail: null } });
        },
        onError: (error) => {
            setState({ ...state, [type]: { ...state[type], fail: error } });
        },
    });
    return mutate;
};

const join = async (body: JoinAPIBody) => {
    const { data } = await axios.post('/users', body);
    return data;
};

export const joinPostAPI = (body: JoinAPIBody) => {
    const [state, setState] = useRecoilState(joinState);

    const { mutate } = useMutation(() => join(body), {
        retry: false,
        onSuccess: (data) => {
            setState({ success: data, fail: null });
        },
        onError: (error) => {
            setState({ ...state, fail: error });
        },
    });
    return mutate;
};

const login = async (body: loginAPIBody) => {
    const { data } = await axios.post('/login', body);
    return data;
};

export const loginPostAPI = (body: loginAPIBody) => {
    const [state, setState] = useRecoilState(loginState);

    const { mutate } = useMutation(() => login(body), {
        retry: false,
        onSuccess: (data) => {
            setState({ success: data, fail: null });
        },
        onError: (error) => {
            setState({ ...state, fail: error });
        },
    });
    return mutate;
};
