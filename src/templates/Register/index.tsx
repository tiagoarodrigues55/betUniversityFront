import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import questions from '../../assets/questions.json';

import api from '../../services/api';
import * as S from './styles';

function RegisterTemplate() {
	const router = useRouter();
	const { data: session } = useSession();

	const [formValues, setFormValues] = useState<any>({});
	const [question, setQuestion] = useState<any>();
	const [wallet, setWallet] = useState<number>(0);

	useEffect(() => {
		setQuestion(questions[session?.user?.forms_progress + 1 || 0]);
		setWallet(session?.user?.wallet || 0);
		// setQuestion(questions[session.user.forms_progress + 1 || 0]);
	}, [session]);

	console.log(session?.user?.wallet);

	async function handleOnClick() {
		const payload = {
			email: session.user.email,
			name: session.user.name,
			favorite_team: '',
			wallet,
			forms_progress: question.id,
			expected_bet: 0,
		};

		api.post('/users', payload).then((response) => {
			console.log(response);
			router.push('/');
		});
	}

	function handleChange(event: any) {
		setFormValues({
			...formValues,
			[event.target.name]: event.target.value,
		});
	}

	function nextQuestion() {
		setQuestion(questions[question.id + 1]);
		setWallet(wallet + 10);
	}

	return (
		<S.Wrapper>
			<S.Container>
				<h1>Cadastre-se</h1>
				<p>
					Você pode fazer o cadastrado com o google ou preencher umas perguntas
					para poder ganhar mais pontos para apostar.
				</p>

				<S.Form action="">
					<div>
						<label>{question?.text}</label>
						<input
							onChange={handleChange}
							name={`${question?.name}`}
							type="text"
						/>
					</div>
					{question?.id === questions.length - 1 ? (
						<span>Ultima questão</span>
					) : (
						<button type="button" onClick={nextQuestion}>
							Próxima questão
						</button>
					)}
				</S.Form>

				<S.SignInButton onClick={handleOnClick}>Crie sua conta</S.SignInButton>
			</S.Container>
		</S.Wrapper>
	);
}

export default RegisterTemplate;
