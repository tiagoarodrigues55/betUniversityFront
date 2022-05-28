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
import { EmblaCarousel } from '../../components/Carousel';
import { EventCard } from '../../components/EventCard';
import { RowDivStyled } from '../../components/EventCard/style';

interface Card {
	name: string;
	teams: string[];
}

export default function Login() {
	const { setData, user } = useAuth();

	const [selectedCard, setSelectedCard] = useState<Card>({
		name: '',
		teams: [''],
	});
	const [logged, setLogged] = useState(false);

	const [selectedOdd, setSelectedOdd] = useState<number>();

	const [betValue, setBetValue] = useState(0);

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

						<EmblaCarousel />
					</ContainerTemplateStyled>
				</ContainerStyled>

				<main className={styles.main}>
					<RowDivStyled>
						<EventCard />
					</RowDivStyled>
				</main>
			</ContainerReturnStyled>
		</div>
	);
}
