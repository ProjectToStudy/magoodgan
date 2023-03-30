import { atom } from 'recoil';
import { BoardListBody } from '../../types/board';

// eslint-disable-next-line import/prefer-default-export
export const boardList = atom<BoardListBody[]>({
    key: 'boardListState',
    default: [],
});
