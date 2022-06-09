import { useState, useEffect } from 'react';

import axios from 'axios';

import ModalBet from '../components/ModalBet';
import Games from '../components/Games';
import Sports from '../components/Sports';
import { GetServerSideProps } from 'next';
import { getSession } from 'next-auth/react';

export default function Home() {
	const [games, setGames] = useState([]);
	const [sport, setSport] = useState('futebol');
	const [modalBet, setModalBet] = useState<any>({
		isModalOpen: false,
		game: null,
	});

	function handleCloseModal() {
		setModalBet({ isModalOpen: false, game: null });
	}

	function handleOpenModal({ game }) {
		setModalBet({ isModalOpen: true, game });
	}

	function handleChooseSport(sport: string) {
		setSport(sport);
		axios.get('/api/get-event').then((res) => {
			setGames(
				res.data.events.filter((game) => game.modality.toLowerCase() === sport)
			);
		});
	}

	useEffect(() => {
		axios.get('/api/get-event').then((res) => {
			setGames(
				res.data.events.filter((game) => game.modality.toLowerCase() === sport)
			);
		});
	}, []);

	return (
		<>
			<ModalBet
				handleCloseModal={handleCloseModal}
				isModalOpen={modalBet.isModalOpen}
				game={modalBet.game}
			/>
			<Sports sport={sport} handleChooseSport={handleChooseSport} />
			<Games games={games} handleOpenModal={handleOpenModal} />
		</>
	);
}

export const getServerSideProps: GetServerSideProps = async (context) => {
	const session = await getSession(context);

	if (!session) {
		return {
			redirect: {
				destination: '/login',
				permanent: false,
			},
		};
	}

	return {
		props: {},
	};
};
