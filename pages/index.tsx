import { useState, useEffect } from 'react';

import Router from 'next/router';
import Image from 'next/image';

import { useForm } from 'react-hook-form';

import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

import Swal from 'sweetalert2';

import GoogleIcon from '../assets/googleIcon.png';

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

	const {
		control,
		handleSubmit,
		formState: { errors },
	} = useForm({ resolver: yupResolver(loginSchema) });

	useEffect(() => {
		setLoginSocialData();
	}, []);

	const setLoginSocialData = async () => {
		const supabaseSession = JSON.parse(
			window.localStorage.getItem('supabase.auth.token')
		);

		if (!supabaseSession) return;

		const userSupabase = supabaseSession?.currentSession.user.user_metadata;

		if (userSupabase?.email_verified) {
			const payload = {
				email: userSupabase.email,
				name: userSupabase.name,
				wallet: 100,
				isGoogle: true,
			};

			const { status, data } = await axios.post('/api/login', payload);

			if (status !== 200) {
				Swal.fire({
					text: 'Erro inesperado, tente novamente mais tarde',
					icon: 'error',
					confirmButtonText: 'Entendi',
				});
			} else {
				if (!data.isUser) {
					Swal.fire({
						text: 'E-mail ainda não cadastrado',
						icon: 'warning',
						confirmButtonText: 'Criar cadastro',
					}).then(() => {
						setData({ email: userSupabase.email });
						return Router.push('/signup');
					});
				} else {
					setData(data.user);
					return Router.push('/home');
				}
			}
		}
	};

	const loginSocial = async () => {
		await supabase.auth
			.signIn({
				provider: 'google',
			})
			.then(async () => {
				setLoginSocialData();
			});
	};

	const login = async (form: Login) => {
		const payload = {
			email: form.email,
			password: form.password,
			wallet: 100,
			isGoogle: false,
		};

		const { status, data } = await axios.post('/api/login', payload);

		if (status !== 200) {
			Swal.fire({
				text: 'Erro inesperado, tente novamente mais tarde',
				icon: 'error',
				confirmButtonText: 'Entendi',
			});
		} else {
			if (!data.isUser) {
				Swal.fire({
					text: 'E-mail ainda não cadastrado',
					icon: 'warning',
					confirmButtonText: 'Criar cadastro',
				}).then(() => {
					setData({ email: form.email });
					return Router.push('/signup');
				});
			} else {
				setData(data.body?.user);
				return Router.push('/home');
			}
		}
	};

	const loginIfEnterPressed = (e: any, form?: Login) => {
		if (e.keyCode === 13 && form) login(form);
	};

	return (
		<>
			<MainStyled onSubmit={handleSubmit(login)}>
				{/* <IMGStyled src={Logo} alt="Logo" /> */}
				<TitleStyled>
					Entre ou crie <br /> uma conta
				</TitleStyled>
				<div style={{ width: '320px' }}>
					<Input
						control={control}
						id="email"
						name="email"
						type="email"
						placeholder="Digite seu e-mail"
						error={errors.email && errors.email.message}
					/>

					<InputPassword
						isControlled={true}
						control={control}
						onKeyPress={loginIfEnterPressed}
						type="password"
						placeholder="Digite sua senha"
						name="password"
						error={errors.password && errors.password.message}
					/>
				</div>
				<Link href="/signup">
					<LinkStyled>Ainda não possuo cadastro</LinkStyled>
				</Link>
				<Button
					type="submit"
					border="none"
					width="300px"
					text="Entrar"
					textColor="#fff"
					dataTestId="loginButton"
				/>
				<div style={{ marginTop: '1rem' }}>
					<Image
						src={GoogleIcon}
						alt="Picture of the author"
						width={50}
						height={50}
						onClick={() => {
							loginSocial();
						}}
					/>
				</div>
			</MainStyled>
		</>
	);
}
