import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Header from './organisms/Header';
import { checkPostAPI } from '../modules/api/user';

interface Props {
    children: React.ReactNode;
}

const noHeaderPages = ['/user/join', '/user/login'];

const Layout = ({ children }: Props) => {
    const router = useRouter();

    const [accessToken, setAccessToken] = useState('');

    const checkAPI = checkPostAPI(accessToken);

    useEffect(() => {
        const at = window.localStorage.getItem('AT');
        if (at) setAccessToken(at);
    }, []);

    useEffect(() => {
        if (accessToken !== '') checkAPI();
    }, [accessToken]);

    return (
        <>
            {!noHeaderPages.includes(router.pathname) && <Header />}
            {children}
        </>
    );
};

export default Layout;
