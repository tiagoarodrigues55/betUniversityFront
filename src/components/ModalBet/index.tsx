import { useSession } from 'next-auth/react';
import React, { useState } from 'react';
import Swal from 'sweetalert2';
import api from '../../services/api';

import * as S from './styles';

type ModalBetProps = {
	isModalOpen: boolean;
	handleCloseModal: () => void;
	game: any;
};

function ModalBet({
	isModalOpen,
	handleCloseModal,
	game,
}: ModalBetProps) {
	const { data: session } = useSession();

	const [odd, setOdd] = useState(0);
	const [expectedReturn, setExpectedReturn] = useState('');
	const [bet, setBet] = useState(10);

	if (!game) return null;

	function handleChooseOdd(odd: number) {
		setOdd(odd);
		setExpectedReturn((Number(odd) * bet).toFixed(2));

	}

	function onChange(value) {
		setBet(Number(value));
		setExpectedReturn((Number(odd) * Number(value)).toFixed(2));
	}

	function onCloseModal() {
		handleCloseModal();
		handleChooseOdd(0);
		onChange(0);
	}

	async function handleBet({ game, odd }) {
		if (session?.user.wallet >= bet) {
			const betValue = {
				user_id: session.user.id,
				game_id: game.id,
				game_name: game.name,
				teams: game.teams,
				modality: game.modality,
				odds: game.odds,
				bet: game.odds.indexOf(odd),
				bet_value: bet,
				offer: false,
				status: 'open',
			};

			await api.post('/api/bets', betValue);

			const event = new Event("visibilitychange");
			document.dispatchEvent(event);

			onCloseModal()

			return Swal.fire({
				text: 'Boa sorte!',
				title: 'Proposta criada com sucesso',
				icon: 'success',
				confirmButtonText: 'Bora',
			});
		}

		Swal.fire({
			text: 'Saldo Insuficiente',
			icon: 'error',
			confirmButtonText: 'Entendi',
		});
	}

	return (
		<S.Backdrop onClick={onCloseModal} isModalOpen={isModalOpen}>
			<S.Wrapper onClick={(event) => event.stopPropagation()}>
				<h2>
					{game?.name} - {game?.teams?.join(' x ')}
				</h2>

				<S.Odds>
					{game.teams.map((team, index) => (
						<S.Odd key={index}>
							<>
								<S.OddText>
									<p>{team}</p>-<span>{game?.odds[index]}</span>
								</S.OddText>
								<button onClick={() => handleChooseOdd(game?.odds[index])}>
									Selecionar
								</button>
							</>
						</S.Odd>
					))}
				</S.Odds>
				<p>Odd selecionada: {odd}</p>

				<div className="form-control">
					<label htmlFor="">Valor apostado</label>
					<input
						type="number"
						value={bet}
						onChange={(event) => onChange(event.target.value)}
					/>
				</div>

				<p>Valor retornado: {expectedReturn}</p>

				<button onClick={() => handleBet({ game, odd })}>Apostar</button>
			</S.Wrapper>
		</S.Backdrop>
	);
}

export default ModalBet;
