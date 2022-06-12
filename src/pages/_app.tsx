import { AppProps } from 'next/app';
import { QueryClientProvider } from 'react-query';
import { SessionProvider } from 'next-auth/react';

import { AuthProvider } from '../hooks/auth/auth';

import { GlobalStyles } from '../styles/global';

import Header from '../components/Header';
import Navbar from '../components/Navbar';
import { queryClient } from '../services/queryClient';
import { useRouter } from 'next/router';
import { EventProvider } from '../context/EventContext';

const MyApp: React.FC<AppProps> = ({
	Component,
	pageProps: { session, ...pageProps },
}) => {
	const router = useRouter();
	return (
		<SessionProvider session={session}>
			<QueryClientProvider client={queryClient}>
				<EventProvider>
					{router.pathname !== '/login' && router.pathname !== '/register' && (
						<>
							<Header />
							<Navbar />
						</>
					)}
					<Component {...pageProps} />
					<GlobalStyles />
				</EventProvider>
			</QueryClientProvider>
		</SessionProvider>
	);
};

export default MyApp;
