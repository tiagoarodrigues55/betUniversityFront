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
	removeData: () => void;
}

const AuthContext = createContext({} as IAuthContextData);

function AuthProvider({ children }: AuthProviderProps) {
	const [user, setUser] = useState<User>({} as User);
	const [isLoadingUser, setIsLoadingUser] = useState(true);

	useEffect(() => {
		const userFromLocalStorage = window.localStorage.getItem('user');
		if (userFromLocalStorage) {
			const userJson = JSON.parse(userFromLocalStorage) as User;
			setUser(userJson);
		}

		setIsLoadingUser(false);
	}, []);

	const setData = async (response: any) => {
		window.localStorage.setItem('user', JSON.stringify(response));
		setUser(response);
	};

	const getUser = () => {
		const user = JSON.parse(window.localStorage.getItem('item') ?? '{}');

		return user;
	};

	const removeData = () => {
		return window.localStorage.removeItem('item');
	};

	return (
		<AuthContext.Provider
			value={{ user, isLoadingUser, removeData, setData, getUser }}
		>
			{children}
		</AuthContext.Provider>
	);
}

function useAuth() {
	const context = useContext(AuthContext);

	return context;
}

export { AuthProvider, useAuth };
