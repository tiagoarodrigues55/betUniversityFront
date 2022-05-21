import { useState, useEffect } from 'react';

import Router from 'next/router';

import { useForm } from 'react-hook-form';

import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

import Swal from 'sweetalert2';

import GoogleIcon from '../public/assets/googleIcon.png';

import { supabase } from '../../services/supabaseClient';
import { useAuth } from '../../hooks/auth/auth';
import axios from 'axios';
import {
	IMGStyled,
	LinkStyled,
	MainStyled,
	SpanStyled,
	TextStyled,
	TitleStyled,
} from '../../styles/login';

import { Button } from '../../components/Button';
import { InputPassword } from '../../components/InputPassword';
import { Input } from '../../components/Input';
import Link from 'next/link';

const signUpSchema = Yup.object().shape({
	email: Yup.string()
		.trim()
		.email('Digite seu email')
		.required('Digite seu email'),
	password: Yup.string()
		.required('Informe sua senha atual')
		.min(8, 'Informe sua senha atual')
		.matches(/([a-zA-Z])/, 'Informe sua senha atual')
		.matches(/([0-9])/, 'Informe sua senha atual'),
	name: Yup.string()
		.required('Nome é obrigatório')
		.trim()
		.matches(
			/^([a-zA-ZÀ-ú]{2,}[ ])+([a-zA-ZÀ-ú]{1,})+(?: [a-zA-Z]+){0,4}$/,
			'Digite nome e sobrenome, números são proibidos!'
		)
		.nullable(),
	team: Yup.string()
		.required('Nome do Time é obrigatório')
		.trim()
		.min(3, 'Digite um nome válido')
		.nullable(),
});

interface SignUp {
	email: string;
	password: string;
	name: string;
	team: string;
}
export default function Login() {
	const [logged, setLogged] = useState(false);
	const [signUpForm, setSignUpForm] = useState(false);

	const { setData, user } = useAuth();

	const {
		control,
		handleSubmit,
		setValue,
		formState: { errors },
	} = useForm({ resolver: yupResolver(signUpSchema) });

	useEffect(() => {
		setDatas();
	}, [user]);

	const setDatas = async () => {
		const user = JSON.parse(window.localStorage.getItem('user')) ?? '';

		if (user.email) setValue('email', user.email);
		if (user.name) setValue('name', user.name);
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

	const createUser = async (form?: SignUp) => {
		const payload = {
			email: form.email,
			name: form.name,
			password: form.password,
			team: form.team,
			wallet: 100,
		};

		const { status, data } = await axios.post('/api/create-user', payload);

		if (status !== 200) {
			Swal.fire({
				text: 'Erro inesperado, tente novamente mais tarde',
				icon: 'error',
				confirmButtonText: 'Entendi',
			});
		} else {
			if (!data.isUser) {
				return Swal.fire({
					text: 'Conta criada com sucesso',
					icon: 'success',
					confirmButtonText: 'Entendi',
				}).then(() => {
					setData(data.user);
					return Router.push('/home');
				});
			} else {
				return Swal.fire({
					text: 'E-mail já cadastrado',
					icon: 'warning',
					confirmButtonText: 'Entendi',
				}).then(() => {
					return Router.push('/');
				});
			}
		}
	};

	const loginIfEnterPressed = (e: any, form?: SignUp) => {
		if (e.keyCode === 13 && form) createUser(form);
	};

	return (
		<div>
			<button onClick={loginSocial}>Login...</button>
			<MainStyled onSubmit={handleSubmit(createUser)}>
				{/* <IMGStyled src={Logo} alt="Logo VirtusPay" /> */}
				<TitleStyled>Crie uma conta</TitleStyled>
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
					<Input
						control={control}
						id="name"
						name="name"
						type="name"
						placeholder="Digite seu nome"
						error={errors.name && errors.name.message}
					/>
					<Input
						control={control}
						id="team"
						name="team"
						type="team"
						placeholder="Digite seu time favorito"
						error={errors.team && errors.team.message}
					/>
				</div>
				<Link href="/">
					<LinkStyled>Já possuo cadastro</LinkStyled>
				</Link>
				<Button
					type="submit"
					border="none"
					width="300px"
					text="Entrar"
					textColor="#fff"
					dataTestId="loginButton"
				/>
			</MainStyled>
		</div>
	);
}
