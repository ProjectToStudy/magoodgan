import { useEffect, useState } from 'react';
import { useSetRecoilState } from 'recoil';
import { listGetAPI } from '../../modules/api/board';
import { boardList } from '../../modules/state/board';
import GeneralComponent from '../../components/board/General';

const GeneralContainer = ({ board, title }: { board: string; title: string }) => {
    const [page, setPage] = useState<number>(1);
    const setList = useSetRecoilState(boardList);

    const { success, fail } = listGetAPI(board, page);

    useEffect(() => {
        if (fail) console.log('fail');
        if (success) setList(success.result.data);
    }, [success, fail]);

    return (
        <GeneralComponent board={board} title={title} />
    );
};

export default GeneralContainer;
