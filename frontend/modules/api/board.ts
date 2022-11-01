import { useQuery } from '@tanstack/react-query';
import axios from '.';

const getList = async (category: string, page: number) => {
    const { data } = await axios.get(`/${category}?page=${page}`);
    return data;
};

// eslint-disable-next-line import/prefer-default-export
export const listGetAPI = (category: string, page: number) => {
    const { data, error } = useQuery(
        [category, page],
        () => getList(category, page),
        {
            retry: false,
        },
    );
    return { success: data, fail: error };
};
