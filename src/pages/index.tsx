import { useState, useEffect } from 'react';

import ModalBet from '../components/ModalBet';
import Games from '../components/Games';
import Sports from '../components/Sports';
import { GetServerSideProps } from 'next';
import { getSession } from 'next-auth/react';
import api from '../services/api';
import { useQuery } from 'react-query';
import { users } from '../services/registers-repo';
import useEvent from '../context/EventContext';

export default function Home() {
	const { event } = useEvent()
	const [sport, setSport] = useState('Futebol');
	const [modalBet, setModalBet] = useState<any>({
		isModalOpen: false,
		game: null,
	});

	const { data, refetch } = useQuery(['games', sport], async () => {
		const response = await api.get(`/api/games?modality=${sport}&event=${event}&status=open`);
		return response.data.sort(function (a, b) {
			if (a.name > b.name) {
				return 1;
			}
			if (a.name < b.name) {
				return -1;
			}
			return 0;
		});
	});

	function handleCloseModal() {
		setModalBet({ isModalOpen: false, game: null });
	}

	function handleOpenModal({ game }) {
		setModalBet({ isModalOpen: true, game });
	}

	function handleChooseSport(sport: string) {
		setSport(sport);
		refetch();
	}

	return (
		<>
			<ModalBet
				handleCloseModal={handleCloseModal}
				isModalOpen={modalBet.isModalOpen}
				game={modalBet.game}
			/>
			<Sports sport={sport} handleChooseSport={handleChooseSport} />
			<Games games={data} handleOpenModal={handleOpenModal} />
		</>
	);
}

export const getServerSideProps: GetServerSideProps = async (context) => {
	const session = await getSession(context);
	const isUserInDatabase = await users.getUserByEmail(session?.user?.email);
	const date = new Date()
	date.setHours(date.getHours() - 3);



	api.post(`/api/games/lock-games?date=${date.toISOString()}`).then(res => console.log(res.data)).catch(err => console.log(err))
	if (!session) {
		return {
			redirect: {
				destination: '/login',
				permanent: false,
			},
		};
	}

	if (!isUserInDatabase?.data?.email) {
		return {
			redirect: {
				destination: '/register',
				permanent: false,
			},
		};
	}

	return {
		props: {},
	};
};
