import { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import { useRouter } from 'next/router';
import { itemGetAPI } from '../../../modules/api/board';
import { boardItem, boardNameDict } from '../../../modules/state/board';
import PostComponent from '../../../components/board/Post';
import GeneralContainer from '../../../containers/board/General';

const Pid = () => {
    const router = useRouter();
    const { boardName, pid } = router.query;

    const [item, setItem] = useRecoilState(boardItem);

    const [info, setInfo] = useState({ board: '', pid: 0 });

    const { success, fail } = itemGetAPI(info.board, info.pid);

    useEffect(() => {
        if (typeof boardName !== 'string' || typeof pid !== 'string') return;

        setInfo({ board: boardName, pid: Number(pid) });
    }, [boardName, pid]);

    useEffect(() => {
        if (fail) console.log('fail');
        if (success) {
            if (Object.keys(success.result).includes('content')) setItem(success.result);
        }
    }, [success, fail]);

    return (
        <div id="container">
            <PostComponent board={info.board} />
            <GeneralContainer board={info.board} title={boardNameDict[info.board]} />
        </div>
    );
};

export default Pid;
