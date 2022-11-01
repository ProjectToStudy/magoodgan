import { useEffect, useState } from 'react';
import { useSetRecoilState } from 'recoil';
import { boardList } from '../../modules/state/board';
import { listGetAPI } from '../../modules/api/board';
import NoticeComponent from '../../components/board/Notice';

const NoticeContainer = () => {
    const [page, setPage] = useState<number>(1);
    const setList = useSetRecoilState(boardList);

    const { success, fail } = listGetAPI('notice', page);

    useEffect(() => {
        if (success) setList(success.result.data);
        if (fail) console.log('fail');
    }, [success, fail]);

    return (
        <NoticeComponent />
    );
};

export default NoticeContainer;
