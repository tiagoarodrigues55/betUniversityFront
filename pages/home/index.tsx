import { useState, useEffect } from 'react';
import Image from 'next/image';

import axios from 'axios';

import styles from '../../styles/Home.module.css';

import { Event } from '../../Types';
import { useAuth } from '../../hooks/auth/auth';

import { Navbar } from '../../components/Navbar';
import {
	CardDiv,
	CardsSection,
	ContainerReturnStyled,
	ContainerStyled,
	ContainerTemplateStyled,
	TwoCards,
	TwoCardsSecond,
} from './styles';

import GoogleIcon from '../../assets/googleIcon.png';
import Link from 'next/link';
import { Card } from '../../components/ModalityCard';

import { FaFutbol } from 'react-icons/fa';
import { MdSportsHandball } from 'react-icons/md';
import { GiPartyPopper } from 'react-icons/gi';
import { BsCalendarEvent } from 'react-icons/bs';

interface Card {
	name: string;
	teams: string[];
}

export default function Login() {
	const { setData, user } = useAuth();

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
		// getData();
	}, []);

	const bet = (card, odd) => {
		const newUser = user;
		newUser.wallet = user?.wallet - betValue * card.odds.indexOf(odd);
		console.log(newUser);
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

	return (
		<div>
			<Navbar title="Minha conta" link="/profile" />
			<ContainerReturnStyled>
				<ContainerStyled>
					<ContainerTemplateStyled>
						<CardsSection>
							<TwoCards>
								<Card
									icon={<FaFutbol size={30} className="mt-3" />}
									title="Futebol"
									text="Ver partidas"
								/>
								<CardDiv>
									<Card
										icon={<MdSportsHandball size={30} className="mt-3" />}
										title="Handebol"
										text="Ver partidas"
									/>
								</CardDiv>
							</TwoCards>

							<TwoCardsSecond>
								<Card
									icon={<GiPartyPopper size={30} className="mt-3" />}
									title="Festas"
									text="Ver festas"
								/>
								<CardDiv>
									<Card
										icon={<BsCalendarEvent size={30} className="mt-3" />}
										title="Eventos"
										text="Ver eventos"
									/>
								</CardDiv>
							</TwoCardsSecond>
						</CardsSection>
					</ContainerTemplateStyled>
				</ContainerStyled>

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
			</ContainerReturnStyled>
		</div>
	);
}
