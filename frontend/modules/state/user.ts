import { atom } from 'recoil';

interface ApiState {
    success: any;
    fail: any;
}
export const initialState = {
    success: null,
    fail: null,
};

export const duplicatedState = atom<{ id: ApiState, email: ApiState }>({
    key: 'duplicatedState',
    default: {
        id: initialState,
        email: initialState,
    },
});

export const joinState = atom<ApiState>({
    key: 'joinState',
    default: initialState,
});

export const loginState = atom<ApiState>({
    key: 'loginState',
    default: initialState,
});

export const isLogin = atom<boolean>({
    key: 'isLogin',
    default: false,
});
