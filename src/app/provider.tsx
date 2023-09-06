'use client';

import { MutationCache, QueryCache, QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { PropsWithChildren, useEffect, useState } from 'react';
import Modal from 'react-modal';
import StyledComponentsRegistry from './styles/StyledComponentsRegistry';
import { GlobalStyle } from './styles/global-style';
import ToastRegistry from './components/shared/layouts/ToastRegistry';

const Provider = ({ children }: PropsWithChildren) => {
    const [queryClient] = useState(
        () =>
            new QueryClient({
                defaultOptions: {
                    queries: {
                        refetchOnWindowFocus: false,
                        refetchOnMount: false,
                        retry: 0,
                        cacheTime: 1000 * 60 * 15,
                    },
                },
                queryCache: new QueryCache({
                    onError: (err: any) => {
                        console.log('queryCache', err);
                    },
                }),
                mutationCache: new MutationCache({
                    onError: (err: any) => {
                        console.log('mutationCache', err);
                    },
                }),
            }),
    );
    useEffect(() => {
        Modal.setAppElement('body');
    }, []);
    return (
        <StyledComponentsRegistry>
            <QueryClientProvider client={queryClient}>
                {children}
                <ReactQueryDevtools />
            </QueryClientProvider>
            <GlobalStyle />
            <ToastRegistry />
        </StyledComponentsRegistry>
    );
};

export default Provider;
