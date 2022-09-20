import { useState } from 'react';
import { Hydrate, QueryClient, QueryClientProvider } from '@tanstack/react-query';
import type { AppProps } from 'next/app';
import Layout from '../components/Layout';
import '../styles/globals.css';

const MyApp = ({ Component, pageProps }: AppProps) => {
    const [queryClient] = useState(() => new QueryClient());

    return (
        <QueryClientProvider client={queryClient}>
            <Hydrate state={pageProps.dehydrateState}>
                <Layout>
                    <Component {...pageProps} />
                </Layout>
            </Hydrate>
        </QueryClientProvider>
    );
};

export default MyApp;
