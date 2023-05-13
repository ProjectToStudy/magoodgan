import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import { boardNameDict } from '../../../modules/state/board';
import GeneralContainer from '../../../containers/board/General';

const Index = () => {
    const router = useRouter();

    const { boardName } = router.query;

    const [board, setBoard] = useState<string>('');
    const [title, setTitle] = useState<string>('');

    useEffect(() => {
        if (typeof boardName === 'string') setBoard(boardName);
    }, [boardName]);

    useEffect(() => {
        if (board === '') return;

        setTitle(boardNameDict[board]);
    }, [board]);

    return (
        <div id="container">
            <Head>
                <title>
                    {title}
                    {' '}
                    | 이문세의 마굿간
                </title>
            </Head>
            <GeneralContainer board={board} title={title} />
        </div>
    );
};

export default Index;
