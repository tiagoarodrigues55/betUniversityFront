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
	const event = 'integramix';

	const options = {
		team: universities.map((uni) => ({
			value: String(uni.Estado),
			label: String(uni.Estado),
		})),
		sport: [
			{ value: "Futebol", label: "Futebol" },
			{ value: "Futsal", label: "Futsal" },
			{ value: "Handebol", label: "Handebol" },
			{ value: "Basquete", label: "Basquete" },
			{ value: "Vôlei", label: "Vôlei" },
			{ value: "Judô", label: "Judô" },
			{ value: "Tênis de Mesa", label: "Tênis de Mesa" },
			{ value: "Natação", label: "Natação" },
			{ value: "Tênis de Campo", label: "Tênis de Campo" },
			{ value: "Atletismo", label: "Atletismo" },
			{ value: "Xadrez", label: "Xadrez" },
			{ value: "Rugby", label: "Rugby" },
			{ value: "Atletismo", label: "Atletismo" },
		],
		idea: [
			{ value: 4, label: "Adorei" },
			{ value: 3, label: "Gostei" },
			{ value: 2, label: "Indiferente" },
			{ value: 1, label: "Não gostei" },
			{ value: 0, label: "Odiei" },
		]
	}

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
			wallet: wallet + 10,
			forms_progress: question.id,
			expected_bet: formValues.expectedBet,
			afiliation_id: localStorage.getItem("afiliation_id") || null
		};

		api.post('/api/users', payload).then((response) => {
			const event = new Event('visibilitychange');
			document.dispatchEvent(event);
			router.push('/');
		});
	}

	function handleChange(event: any) {
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

	async function inviteFriend(e) {
		e.preventDefault();
		const payload = {
			email: session.user.email,
			name: session.user.name,
			instagram: formValues.insta,
			favorite_team: formValues.team,
			nps: formValues.nps,
			idea: formValues.idea,
			sport: formValues.sport,
			wallet: wallet + 10,
			forms_progress: question.id,
			expected_bet: formValues.expectedBet,
			afiliation_id: localStorage.getItem("afiliation_id") || null
		};

		api.post('/api/users', payload).then((response) => {
			const shareUrl = `https://interbet.vercel.app/login?afiliation_id=${response.data.user.id || 188}`
			window.open(`https://api.whatsapp.com/send?text=${shareUrl}`, '_blank');
			const event = new Event('visibilitychange');
			document.dispatchEvent(event);
			router.push('/');
		});
	}
	return (
		<S.Wrapper>
			<S.Container>
				<S.Form action="">
					<div className={question?.type}>
						<label>{question?.text.replace('{evento}', event)}</label>
						{question?.type === 'select' ? (
							<CreatableSelect
								key={`my_unique_select_key__${question?.name}`}

								className="select"
								name={question?.name}
								isClearable
								onChange={(event: any) => {
									console.log(event)
									console.log(event.value)
									setFormValues({
										...formValues,
										[question?.name]: event?.value,
									})
								}}
								options={options[question.name]}
							/>
						) : (
							<input
								onChange={handleChange}
								name={`${question?.name}`}
								type={question?.type}
							/>
						)}
					</div>
				</S.Form>
				{question?.id === questions.length - 1 ? (
					<S.SignInButton onClick={handleOnClick}>
						Ir para tela inicial
					</S.SignInButton>
				) : (
					<S.SignInButton onClick={nextQuestion}>
						Próxima
					</S.SignInButton>
				)}
			</S.Container>
		</S.Wrapper>
	);
}

export default RegisterTemplate;
