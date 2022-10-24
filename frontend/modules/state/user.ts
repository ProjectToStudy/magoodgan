import { atom } from 'recoil';

interface ApiState {
    success: any;
    fail: any;
}
const initialState = {
    success: null,
    fail: null,
};

export const idDuplicatedState = atom<ApiState>({
    key: 'idDuplicatedState',
    default: initialState,
});

export const joinState = atom<ApiState>({
    key: 'joinState',
    default: initialState,
});
