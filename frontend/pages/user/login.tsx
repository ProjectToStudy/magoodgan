import { NextPage } from 'next';
import Head from 'next/head';
import LoginContainer from '../../containers/user/Login';

const Login: NextPage = () => {
    return (
        <div id="container">
            <Head>
                <title>로그인 | 이문세의 마굿간</title>
            </Head>
            <LoginContainer />
        </div>
    );
};

export default Login;
