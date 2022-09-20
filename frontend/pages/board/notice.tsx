import { NextPage } from 'next';
import Head from 'next/head';
import NoticeContainer from '../../containers/board/Notice';

const Notice: NextPage = () => {
    return (
        <div id="container">
            <Head>
                <title>공지 | 이문세의 마굿간</title>
            </Head>
            <NoticeContainer />
        </div>
    );
};

export default Notice;
