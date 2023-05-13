import { useQuery } from '@tanstack/react-query';
import axios from '.';

const getList = async (category: string, page: number) => {
    const { data } = await axios.get(`/${category}?page=${page}`);
    return data;
};

export const listGetAPI = (category: string, page: number) => {
    const { data, error } = useQuery(
        [category, page, 'list'],
        () => getList(category, page),
        {
            retry: false,
            enabled: category !== '',
        },
    );
    return { success: data, fail: error };
};

const getItem = async (board: string, id: number) => {
    const { data } = await axios.get(`/${board}/${id}`);
    return data;
};

export const itemGetAPI = (board: string, id: number) => {
    const { data, error } = useQuery(
        [board, id, 'item'],
        () => getItem(board, id),
        {
            retry: false,
            enabled: board !== '' && id !== 0,
        },
    );
    return { success: data, fail: error };
};
