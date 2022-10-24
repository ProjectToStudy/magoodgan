import { useRecoilState } from 'recoil';
import { useMutation } from '@tanstack/react-query';
import axios from '.';
import { idDuplicatedState, joinState } from '../state/user';
import { JoinAPIBody } from '../../types/join';

const idDuplicated = async (id: string) => {
    const { data } = await axios.post('/users/id/check', { uid: id });
    return data;
};

export const idDuplicatedPostAPI = (userId: string) => {
    const [state, setState] = useRecoilState(idDuplicatedState);

    const { mutate } = useMutation(() => idDuplicated(userId), {
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

const join = async (body: JoinAPIBody) => {
    const { data } = await axios.post('/users/', body);
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
