import { atom } from 'recoil';
import { BoardListBody, ContentsProps } from '../../types/board';

export const boardNameDict: { [key in string]: string } = {
    notice: '공지',
};

export const boardList = atom<BoardListBody[]>({
    key: 'boardListState',
    default: [],
});

export const boardItem = atom<ContentsProps>({
    key: 'boardItemState',
    default: {
        id: 0,
        date: '',
        title: '',
        content: '',
        view: 0,
        nickname: '',
        fix: false,
    },
});
