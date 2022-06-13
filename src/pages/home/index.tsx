import { useState, useEffect } from 'react';

import axios from 'axios';
import Swal from 'sweetalert2';

import { useAuth } from '../../hooks/auth/auth';

import {
	CardDiv,
	CardsSection,
	ContainerReturnStyled,
	ContainerStyled,
	ContainerTemplateStyled,
	TwoCards,
	TwoCardsSecond,
} from './styles';
import { Bet } from '../../components/Bet'

import Router from 'next/router';

import Carousel from '../../components/Carousel';
import SelectSport from '../../components/SelectSport';

export default function Home() {
	const { setData, user } = useAuth();
	const [selectedCard, setSelectedCard] = useState(null);
	const [logged, setLogged] = useState(false);

	const [selectedOdd, setSelectedOdd] = useState<number>(null);

	const [betValue, setBetValue] = useState(0);
	const [selectSport, setSelectSport] = useState("futebol")
	const [games, setGames] = useState([])

	useEffect(() => {
		// getData();

		if (!user.id) {
			Router.push('/')
		}
		axios.get('/api/games').then(res => {
			setGames(res.data)
			console.log(res.data.sort())
		})
	}, []);

	const doBet = async (payload) => {
		const { status, data } = await axios.post('/api/create-bet', payload);
		user.wallet -= betValue
		setData(user)
		return Swal.fire({
			text: 'Boa sorte!',
			title: 'Proposta criada com sucesso',
			icon: 'success',
			confirmButtonText: 'Bora',
		});
	}

	return (
		selectedCard ? (
			<Bet doBet={doBet} selectedCard={selectedCard} selectedOdd={selectedOdd} />
		) : (
			<div>
				<ContainerReturnStyled>
					<ContainerStyled>
						<ContainerTemplateStyled>
							<SelectSport selectSport={(sport) => setSelectSport(sport)} />
							<Carousel games={games} selectOdd={({ game, odd }) => {
								setSelectedOdd(odd)
								setSelectedCard(game)
							}
							} />
						</ContainerTemplateStyled >
					</ContainerStyled >
				</ContainerReturnStyled >
			</div >
		)
	);
}
