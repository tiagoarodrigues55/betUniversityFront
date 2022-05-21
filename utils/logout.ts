import Router from 'next/router';

export const Logout = () => {
		window.localStorage.removeItem('supabase.auth.token');
		window.localStorage.removeItem('user');

		Router.push('/');
	};