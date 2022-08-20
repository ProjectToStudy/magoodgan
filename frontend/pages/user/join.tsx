import { NextPage } from 'next';
import Head from 'next/head';
import JoinContainer from '../../containers/user/Join';

const Join: NextPage = () => {
    return (
        <div id="container">
            <Head>
                <title>회원가입 | 이문세의 마굿간</title>
            </Head>
            <JoinContainer />
        </div>
    );
};

export default Join;
