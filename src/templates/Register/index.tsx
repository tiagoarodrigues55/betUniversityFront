import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import questions from '../../assets/questions.json';
import universities from '../../assets/universidades.json';

import CreatableSelect from 'react-select';

import api from '../../services/api';
import * as S from './styles';

function RegisterTemplate() {
	const router = useRouter();
	const { data: session } = useSession();

	const [formValues, setFormValues] = useState<any>({});
	const [question, setQuestion] = useState<any>();
	const [wallet, setWallet] = useState<number>(0);
	const event = 'Integramix';
	useEffect(() => {
		setQuestion(questions[session?.user?.forms_progress + 1 || 0]);
		setWallet(session?.user?.wallet || 0);
	}, [session]);

	async function handleOnClick() {
		const payload = {
			email: session.user.email,
			name: session.user.name,
			instagram: formValues.insta,
			favorite_team: formValues.team,
			wallet,
			forms_progress: question.id,
			expected_bet: formValues.expectedBet,
		};

		api.post('/api/users', payload).then((response) => {
			const event = new Event('visibilitychange');
			document.dispatchEvent(event);
			router.push('/home');
		});
	}

	function handleChange(event: any) {
		console.log(event);
		setFormValues({
			...formValues,
			[event.target.name]: event.target.value,
		});
	}

	function nextQuestion(event) {
		event.preventDefault();
		console.log(questions[question.id + 1]);
		setQuestion(questions[question.id + 1]);
		setWallet(wallet + 10);
	}
	const customStyles = {
		option: (provided, state) => ({}),
		control: () => ({}),
		singleValue: (provided, state) => {
			const opacity = state.isDisabled ? 0.5 : 1;
			const transition = 'opacity 300ms';

			return { ...provided, opacity, transition };
		},
	};
	return (
		<S.Wrapper>
			<S.Container>
				<S.Form action="">
					<div className={question?.type}>
						<label>{question?.text.replace('{evento}', event)}</label>
						{question?.type === 'select' ? (
							<CreatableSelect
								className="select"
								name={question?.name}
								isClearable
								onChange={(event) =>
									setFormValues({
										...formValues,
										team: event?.value,
									})
								}
								options={universities.map((uni) => ({
									value: String(uni.Estado),
									label: String(uni.Estado),
								}))}
							/>
						) : (
							<input
								onChange={handleChange}
								name={`${question?.name}`}
								type={question?.type}
							/>
						)}
					</div>
					{question?.id === questions.length - 1 ? null : (
						<S.SignInButton onClick={nextQuestion}>
							Ganhar mais 10 Betcoins
						</S.SignInButton>
					)}
				</S.Form>
				<S.SignInButton onClick={handleOnClick}>
					Ir para tela inicial
				</S.SignInButton>
			</S.Container>
		</S.Wrapper>
	);
}

export default RegisterTemplate;
