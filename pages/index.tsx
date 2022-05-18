import { useState, useEffect } from 'react';

import Router from 'next/router';

import styles from '../styles/Home.module.css';

import { supabase } from '../services/supabaseClient';

export default function Login() {
	const [logged, setLogged] = useState(false);
	const [email, setEmail] = useState();
	const [fullName, setFullName] = useState();

	useEffect(() => {
		const supabaseSession = JSON.parse(
			window.localStorage.getItem('supabase.auth.token')
		);

		const user = supabaseSession.currentSession.user.user_metadata;

		if (logged) {
			if (user.email_verified) {
				setEmail(user.email);
				setFullName(user.full_name);
				Router.push('/home');
			}
		}
	}, []);

	const Login = () => {
		supabase.auth
			.signIn({
				provider: 'google',
			})
			.then(() => {
				setLogged(true);
			});
	};

	return (
		<div className={styles.container}>
			<button onClick={Login}>Login...</button>
		</div>
	);
}
