import { AppProps } from 'next/app';

import { AuthProvider } from '../hooks/auth/auth';

import '../styles/global.scss';

function MyApp({ Component, pageProps }: AppProps) {
	return (
		<AuthProvider>
			<Component {...pageProps} />
		</AuthProvider>
	);
}

export default MyApp;
