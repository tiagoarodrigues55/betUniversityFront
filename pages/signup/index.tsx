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
import questions from './questions.json';
import universities from './universidades.json';
import CreatableSelect from 'react-select';
import { ActionMeta, OnChangeValue } from 'react-select';
import LoadingScreen from '../../components/LoadingScreen';


interface SignUp {
	email: string;
	password: string;
	name: string;
	team: string;
	expectedBet: number;
}
export default function Login() {
	const [logged, setLogged] = useState(false);
	const [question, setQuestion] = useState(questions[0]);
	const event = "Integramix"
	const [loading, setLoading] = useState(false);

	const { setData, user } = useAuth();

	const {
		control,
		handleSubmit,
		setValue,
		formState: { errors },
		getValues
	} = useForm();

	useEffect(() => {
		setDatas();
		if (user.forms_progress >= questions.length - 1) {
			Swal.fire({
				text: 'Você já preencheu todas as perguntas do formulário',
				icon: 'success',
				confirmButtonText: 'Ir para o Feed',
			}).then(() => {
				setLoading(true)
				return Router.push('/feed');
			})
			return
		}
		setQuestion(questions[user.forms_progress + 1 || 0])

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
			favorite_team: form.team,
			wallet: user.wallet,
			forms_progress: question.id,
			expected_bet: form.expectedBet
		};
		const { status, data } = user.forms_progress && user.forms_progress > 0 ? (
			await axios.post('/api/create-user', payload)
		) : (
			await axios.post('/api/create-user', payload)
		)
		return Router.push('/feed')
	};

	const loginIfEnterPressed = (e: any, form?: SignUp) => {
		if (e.keyCode === 13 && form) createUser(form);
	};

	function nextQuestion() {
		if (getValues(question.name)) {
			setQuestion(questions[question.id + 1])
			user.wallet += 10
		}
	}

	return (
		<>
			{
				!loading ? (
					<div>
						<button onClick={loginSocial}>Login...</button>
						<MainStyled onSubmit={handleSubmit(createUser)}>
							{
								question.type !== "select" ? (
									<Input
										name={question.name}
										control={control}
										type={question.type}
										placeholder={question.text.replace('{evento}', event)}
										error={errors.team && errors.team.message}
									/>
								) : (
									<CreatableSelect
										className="select"
										isClearable
										onChange={(newValue) => setValue('team', newValue.value)}
										options={universities.map(uni => ({ value: String(uni.Estado), label: String(uni.Estado) }))}
									/>
								)
							}
							<Button
								type="submit"
								border="none"
								width="300px"
								text="Apostar agora"
								textColor="#fff"
								dataTestId="loginButton"
							/>
							{
								questions[question.id + 1] ? (
									<Button
										border="none"
										width="300px"
										text="Ganhar mais 10 pontos"
										textColor="#fff"
										dataTestId="loginButton"
										onClick={() => {
											nextQuestion()
										}}
									/>
								) : null
							}
						</MainStyled>
					</div>
				) : (
					<LoadingScreen />
				)
			}
		</>
	);
}
