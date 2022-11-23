import React from 'react';
import { useRouter } from 'next/router';
import Header from './organisms/Header';

interface Props {
    children: React.ReactNode;
}

const noHeaderPages = ['/user/join', '/user/login'];

const Layout = ({ children }: Props) => {
    const router = useRouter();
    return (
        <>
            {!noHeaderPages.includes(router.pathname) && <Header />}
            {children}
        </>
    );
};

export default Layout;
