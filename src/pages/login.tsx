import { useState, useEffect } from 'react';

import Router from 'next/router';
import Image from 'next/image';

import { useForm } from 'react-hook-form';

import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

import Swal from 'sweetalert2';

import GoogleIcon from '../assets/googleIcon.png';
import Logo from '../assets/UniBet.png';

import { supabase } from '../services/supabaseClient';
import { useAuth } from '../hooks/auth/auth';
import axios from 'axios';
import {
	IMGStyled,
	LinkStyled,
	MainStyled,
	SpanStyled,
	TextStyled,
	TitleStyled,
} from '../styles/login';

import { Button } from '../components/Button';
import { InputPassword } from '../components/InputPassword';
import { Input } from '../components/Input';
import Link from 'next/link';
import LoadingScreen from '../components/LoadingScreen';
import { users } from '../services/registers-repo';

import LoginTemplate from '../templates/Login'

// checar se existe o user no supabase, se existir, prosseguir com a autenticação, se não, redirecionar para a pagina de sign up

const loginSchema = Yup.object().shape({
	email: Yup.string()
		.trim()
		.email('Digite seu email')
		.required('Digite seu email'),
	password: Yup.string()
		.required('Informe sua senha atual')
		.min(8, 'Informe sua senha atual')
		.matches(/([a-zA-Z])/, 'Informe sua senha atual')
		.matches(/([0-9])/, 'Informe sua senha atual'),
});

interface Login {
	email: string;
	password: string;
}

export default function Login() {
	const { setData, user } = useAuth();
	const [loading, setLoading] = useState(false);

	const {
		control,
		handleSubmit,
		formState: { errors },
	} = useForm({ resolver: yupResolver(loginSchema) });

	// useEffect(() => {
	// 	// if (user) {
	// 	// 	// Router.push('/feed');
	// 	// } else {
	// 	const supabaseSession = JSON.parse(
	// 		window.localStorage.getItem('supabase.auth.token')
	// 	);
	// 	if (supabaseSession) {
	// 		setLoginSocialData();
	// 	}
	// 	// }
	// }, []);

	// const setLoginSocialData = async () => {
	// 	const supabaseSession = JSON.parse(
	// 		window.localStorage.getItem('supabase.auth.token')
	// 	);
	// 	if (!supabaseSession) return;

	// 	const userSupabase = supabaseSession?.currentSession.user.user_metadata;

	// 	if (userSupabase?.email_verified) {
	// 		const payload = {
	// 			email: userSupabase.email,
	// 			name: userSupabase.name,
	// 			wallet: 100,
	// 			isGoogle: true,
	// 		};
	// 		setLoading(true);
	// 		const { status, data } = await axios.post('/api/login', payload);
	// 		console.log(data);
	// 		if (status !== 200) {
	// 			Swal.fire({
	// 				text: 'Erro inesperado, tente novamente mais tarde',
	// 				icon: 'error',
	// 				confirmButtonText: 'Entendi',
	// 			});
	// 		} else {
	// 			if (!data.isUser) {
	// 				console.log('não chegou o user');
	// 				return Router.push('/forms');
	// 			} else {
	// 				setData(data.user);
	// 				console.log('Chegou o user');
	// 				return Router.push('/');
	// 			}
	// 		}
	// 	}
	// };

	// const loginSocial = async () => {
	// 	await supabase.auth
	// 		.signIn({
	// 			provider: 'google',
	// 		})
	// 		.then(async (res) => {
	// 			setLoginSocialData();
	// 		});
	// };

	// const login = async (form: Login) => {
	// 	const payload = {
	// 		email: form.email,
	// 		password: form.password,
	// 		wallet: 100,
	// 		isGoogle: false,
	// 	};

	// 	const { status, data } = await axios.post('/api/login', payload);

	// 	if (status !== 200) {
	// 		Swal.fire({
	// 			text: 'Erro inesperado, tente novamente mais tarde',
	// 			icon: 'error',
	// 			confirmButtonText: 'Entendi',
	// 		});
	// 	} else {
	// 		if (!data.isUser) {
	// 			Swal.fire({
	// 				text: 'E-mail ainda não cadastrado',
	// 				icon: 'warning',
	// 				confirmButtonText: 'Criar cadastro',
	// 			}).then(() => {
	// 				setData({ email: form.email });
	// 				return Router.push('/signup');
	// 			});
	// 		} else {
	// 			if (!data.error) {
	// 				setData(data.user);
	// 				return Router.push('/');
	// 			} else {
	// 				Swal.fire({
	// 					text: 'Dados inválidos',
	// 					icon: 'error',
	// 					confirmButtonText: 'Entendi',
	// 				});
	// 			}
	// 		}
	// 	}
	// };

	// const loginIfEnterPressed = (e: any, form?: Login) => {
	// 	if (e.keyCode === 13 && form) login(form);
	// };

	// async function handleLogin() {
	// 	const findUser = await users.getUserByEmail('email');
	// } 

	return <LoginTemplate />
		// <>
		// 	{!loading ? (
		// 		<MainStyled onSubmit={handleSubmit(login)}>
		// 			<Image src={Logo} alt="Logo" className="mt-5" />
		// 			<TitleStyled>Entre na sua conta</TitleStyled>
		// 			<Button
		// 				type="submit"
		// 				border="none"
		// 				width="300px"
		// 				text="Entrar"
		// 				textColor="#fff"
		// 				dataTestId="loginButton"
		// 				onClick={() => {
		// 					loginSocial();
		// 				}}
		// 			/>
		// 		</MainStyled>
		// 	) : (
		// 		<LoadingScreen />
		// 	)}
		// </>
	
}
