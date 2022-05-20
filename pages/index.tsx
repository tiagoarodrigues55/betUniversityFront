import { useState, useEffect } from 'react';

import Router from 'next/router';

import { useForm } from 'react-hook-form';

import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

import styles from '../styles/Home.module.css';

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

const loginSchema = Yup.object().shape({
	userName: Yup.string()
		.trim()
		.email('Digite seu email')
		.required('Digite seu email'),
	password: Yup.string()
		.required('Informe sua senha atual')
		.min(8, 'Informe sua senha atual')
		.matches(/([a-zA-Z])/, 'Informe sua senha atual')
		.matches(/([0-9])/, 'Informe sua senha atual'),
});

const signup = Yup.object().shape({
	userName: Yup.string()
		.trim()
		.email('Digite seu email')
		.required('Digite seu email'),
	password: Yup.string()
		.required('Informe sua senha atual')
		.min(8, 'Informe sua senha atual')
		.matches(/([a-zA-Z])/, 'Informe sua senha atual')
		.matches(/([0-9])/, 'Informe sua senha atual'),
});

interface FormData {
	email: string;
	password: string;
}

export default function Login() {
	const [logged, setLogged] = useState(false);

	const { setData, user } = useAuth();

	const {
		control,
		handleSubmit,
		formState: { errors },
	} = useForm({ resolver: yupResolver(loginSchema) });

	useEffect(() => {
		setDatas();
	}, [logged, user]);

	const setDatas = async () => {
		const supabaseSession = JSON.parse(
			window.localStorage.getItem('supabase.auth.token')
		);

		const userSupabase = supabaseSession?.currentSession.user.user_metadata;

		if (userSupabase?.email_verified) {
			const payload = {
				email: userSupabase.email,
				name: userSupabase.full_name,
				wallet: 100,
			};

			setData(payload);

			const { status } = await axios.post('/api/login', payload);

			// if (status === 200) return Router.push('/home');
		}
	};

	const loginSocial = async () => {
		await supabase.auth
			.signIn({
				provider: 'google',
			})
			.then(() => {
				setLogged(true);
				setDatas();
			});
	};

	const login = async (form?: FormData) => {
		await supabase.auth
			.signIn({
				provider: 'google',
			})
			.then(() => {
				setLogged(true);
				setDatas();
			});
	};

	const loginIfEnterPressed = (e: any, form?: FormData) => {
		if (e.keyCode === 13 && form) login(form);
	};

	return (
		<div className={styles.container}>
			<button onClick={loginSocial}>Login...</button>

			<>
				<MainStyled onSubmit={handleSubmit(Login)}>
					{/* <IMGStyled src={Logo} alt="Logo VirtusPay" /> */}

					<TitleStyled>
						Entre ou crie <br /> uma conta
					</TitleStyled>

					<div style={{ width: '300px' }}>
						<Input
							control={control}
							id="userName"
							name="userName"
							type="userName"
							dataTestId="nameInputLogin"
							placeholder="Digite seu e-mail"
							error={errors.userName && errors.userName.message}
						/>

						<InputPassword
							isControlled={true}
							control={control}
							onKeyPress={loginIfEnterPressed}
							type="password"
							placeholder="Digite sua senha"
							dataTestId="passwordInputLogin"
							name="password"
							error={errors.password && errors.password.message}
						/>
					</div>

					<LinkStyled to="/recover_password">Esqueci minha senha</LinkStyled>

					<Button
						type="submit"
						className="has-gradient-blue"
						border="none"
						width="300px"
						text="Entrar"
						textColor="#fff"
						dataTestId="loginButton"
					/>

					<TextStyled style={{ marginTop: '1.8rem' }}>
						Ainda não possui uma conta?
						<SpanStyled> Fazer cadastro</SpanStyled>
					</TextStyled>

					{/* <TextStyled>ou</TextStyled>

						<TextStyled>Entre com suas redes sociais</TextStyled>

						<div style={{ marginTop: '1rem' }}>{facebookLogin()}</div> */}
				</MainStyled>
			</>
		</div>
	);
}
