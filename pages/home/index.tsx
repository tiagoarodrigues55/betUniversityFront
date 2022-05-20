import { useState, useEffect } from 'react';

import Router from 'next/router';

import axios from 'axios';

import styles from '../../styles/Home.module.css';

import { supabase } from '../../services/supabaseClient';

import { User, Event } from '../../Types';

interface Card {
	name: string;
	teams: string[];
}

export default function Login() {
	const [user, setUsers] = useState<User>();
	const [logged, setLogged] = useState(false);

	const [selectedCard, setSelectedCard] = useState<Card>({
		name: '',
		teams: [''],
	});
	const [selectedOdd, setSelectedOdd] = useState<number>();

	const [betValue, setBetValue] = useState(0);
	const [events, setEvents] = useState<Event[]>([
		{
			teams: ['FGV', 'FEI'],
			odds: [3.2, 1.5, 2.5],
			name: 'Final Futebol 4',
			modality: 'Futebol',
			event_id: '62290cc1b0b144013565945f',
			status: 'open',
			bets: [0.0, 0.0, 12.22], // Quantidade de apostas em cada opção ([0, 0, 0])
			payments: [0.0, 0.0, 12.22], // Dinheiro apostado em cada opção ([0, 0, 0])
			debts: [0.0, 0.0, 12.22],
		},
		{
			teams: ['DFG', 'ABC'],
			odds: [2.1, 2.2, 3.5],
			name: 'Final Futebol 3',
			modality: 'Futebol',
			event_id: '9',
			status: 'open',
			bets: [0.0, 0.0, 12.22], // Quantidade de apostas em cada opção ([0, 0, 0])
			payments: [0.0, 0.0, 12.22], // Dinheiro apostado em cada opção ([0, 0, 0])
			debts: [0.0, 0.0, 12.22],
		},
		{
			teams: ['USP', 'DEW'],
			odds: [1.7, 2.2, 1.5],
			name: 'Final Futebol 2',
			modality: 'Futebol',
			event_id: '30',
			status: 'open',
			bets: [0.0, 0.0, 12.22], // Quantidade de apostas em cada opção ([0, 0, 0])
			payments: [0.0, 0.0, 12.22], // Dinheiro apostado em cada opção ([0, 0, 0])
			debts: [0.0, 0.0, 12.22],
		},
		{
			teams: ['LEU', 'ABC'],
			odds: [2.2, 3.2, 2.7],
			name: 'Final Futebol 1',
			modality: 'Futebol',
			event_id: '12',
			status: 'open',
			bets: [0.0, 0.0, 12.22], // Quantidade de apostas em cada opção ([0, 0, 0])
			payments: [0.0, 0.0, 12.22], // Dinheiro apostado em cada opção ([0, 0, 0])
			debts: [0.0, 0.0, 12.22],
		},
	]);

	useEffect(() => {
		getData();
	}, []);

	const getData = () => {
		if (!window.localStorage.getItem('supabase.auth.token')) {
			Router.push('/');
		}

		axios.get('/api/events').then((res) => {
			setEvents(res.data);
		});

		const supabaseSession = JSON.parse(
			window.localStorage.getItem('supabase.auth.token')
		);

		console.log(supabaseSession.currentSession.user.email);

		const user = supabaseSession.currentSession.user;

		axios
			.get(`/api/users?filter={"email": ${user.email}}`)
			.then((res) => {
				console.log(res);
				setUsers(res.data[0]);
			})
			.catch((err) => console.log(err));
		// axios.get(`/api/users?filter={"id":"6227760eaa2b6113c552d91a"}`).then(res=>{
		//   console.log(res)
		//   setUsers(res.data[0])
		// }).catch(err=>console.log(err))
	};

	const bet = (card, odd) => {
		const newUser = user;
		newUser.wallet = user?.wallet - betValue * card.odds.indexOf(odd);
		console.log(newUser);
		setUsers(newUser);
		axios
			.post('/api/create-bet', {
				userevent_id: 1,
				eventevent_id: card.event_id,
				modality: card.modality,
				odds: card.odds,
				bet: card.odds.indexOf(odd),
				bet_value: betValue,
				offer: false,
			})
			.then((res) => {});
	};

	const Logout = () => {
		window.localStorage.removeItem('supabase.auth.token');
		window.localStorage.removeItem('user');

		Router.push('/');
	};

	return (
		<div className={styles.container}>
			<button onClick={Logout}>Logout...</button>
			User: {user?.wallet}
			<main className={styles.main}>
				{selectedCard ? (
					<div className={styles.selectedCard}>
						<h2>
							{/* {selectedCard.name} - {selectedCard.teams[selectedOdd]} */}
							{selectedCard.name} - {selectedCard.teams}
						</h2>
						<p>Odd: {selectedOdd}</p>
						<input
							onChange={(e) => setBetValue(Number(e.target.value))}
							type="number"
							placeholder="Valor apostado em reais"
						/>
						<p>
							Retorno esperado: R$
							{(Number(selectedOdd) * betValue).toFixed(2)}
						</p>
						{betValue > 0 ? (
							<button onClick={() => bet(selectedCard, selectedOdd)}>
								Apostar
							</button>
						) : null}
					</div>
				) : null}

				<div className={styles.grid}>
					{events.map((event) => (
						<div
							key={event.event_id}
							className={styles.event}
							onClick={() =>
								setSelectedCard({ name: event.name, teams: event.teams })
							}
						>
							<h2>{event.name}</h2>
							<p>{`${event.teams[0]} X ${event.teams[1]}`}</p>
							<button
								onClick={() => {
									setSelectedCard(event);
									setSelectedOdd(event.odds[0]);
								}}
							>
								{event.odds[0]}
							</button>{' '}
							X{' '}
							<button
								onClick={() => {
									setSelectedCard(event);
									setSelectedOdd(event.odds[1]);
								}}
							>
								{event.odds[1]}
							</button>{' '}
							X{' '}
							<button
								onClick={() => {
									setSelectedCard(event);
									setSelectedOdd(event.odds[2]);
								}}
							>
								{event.odds[2]}
							</button>
						</div>
					))}
				</div>
			</main>
		</div>
	);
}
