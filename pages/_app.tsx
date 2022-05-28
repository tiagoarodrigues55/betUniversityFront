import { AppProps } from 'next/app';

import { AuthProvider } from '../hooks/auth/auth';

import '../styles/global.scss';

const MyApp: React.FC<AppProps> = ({ Component, pageProps }) => {
	return (
		<AuthProvider>
			<Component {...pageProps} />
		</AuthProvider>
	);
};

export default MyApp;
