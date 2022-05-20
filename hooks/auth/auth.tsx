import {
	createContext,
	ReactNode,
	useState,
	useContext,
	useEffect,
} from 'react';

import { User } from '../../Types';

interface AuthProviderProps {
	children: ReactNode;
}

interface IAuthContextData {
	user: User;
	isLoadingUser: boolean;
	getUser: () => any;
	setData: (response?: any) => void;
}

const AuthContext = createContext({} as IAuthContextData);

function AuthProvider({ children }: AuthProviderProps) {
	const [user, setUser] = useState<User>({} as User);
	const [isLoadingUser, setIsLoadingUser] = useState(true);

	useEffect(() => {
		const userFromLocalStorage = window.localStorage.getItem('user');
		if (userFromLocalStorage) {
			const userJson = JSON.parse(JSON.stringify(userFromLocalStorage)) as User;
			setUser(userJson);
		}

		setIsLoadingUser(false);
	}, []);

	const setData = async (response: any) => {
		window.localStorage.setItem('user', JSON.stringify(response));
	};

	const getUser = () => {
		const user = JSON.parse(window.localStorage.getItem('item') ?? '{}');

		return user;
	};

	return (
		<AuthContext.Provider value={{ user, isLoadingUser, setData, getUser }}>
			{children}
		</AuthContext.Provider>
	);
}

function useAuth() {
	const context = useContext(AuthContext);

	return context;
}

export { AuthProvider, useAuth };
