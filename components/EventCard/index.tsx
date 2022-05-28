import axios from 'axios';
import React, {
	ReactElement,
	useEffect,
	useLayoutEffect,
	useState,
} from 'react';

import { useForm } from 'react-hook-form';

import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

import {
	Container,
	Title,
	TeamName,
	RowDivStyled,
	ButtonsDivStyled,
	ButtonDivStyled,
	ColumnDivStyled,
} from './style';
import { Event } from '../../Types';
import { MdSportsHandball } from 'react-icons/md';
import { FaFutbol } from 'react-icons/fa';
import useEmblaCarousel from 'embla-carousel-react';
import { useAuth } from '../../hooks/auth/auth';
import { InputControlledCurrency } from '../InputControlledCurrency';
import { moneyMask, undoMoneyMask } from '../../utils/masks';
import { Button } from '../Button';
import Swal from 'sweetalert2';

interface Card {
	name: string;
	teams: string;
	id: string;
	modality: string;
	odds: number[];
}

interface CardProps {
	selectedCardProp: Card;
	selectedOddProp: number;
}

export const BetSchema = Yup.object().shape({
	bet: Yup.string().required('Digite sua aposta'),
});

export const EventCard = () => {
	const { setData, user } = useAuth();

	const [events, setEvents] = useState<Event[]>();

	const [selectedCard, setSelectedCard] = useState<Card>(null);

	const [selectedOdd, setSelectedOdd] = useState<number>();

	const [betValue, setBetValue] = useState(0);

	const [emblaRef] = useEmblaCarousel({
		slidesToScroll: 2,
	});

	const {
		control,
		handleSubmit,
		formState: { errors },
		getValues,
	} = useForm({ resolver: yupResolver(BetSchema) });

	useLayoutEffect(() => {
		getEvents();
	}, []);

	const getEvents = async () => {
		const { status, data } = await axios.get('/api/get-event');

		console.log(data);
		setEvents(data.events);
	};

	const bet = async (card, odd) => {
		const bet = getValues('bet');
		const betValue = Number(undoMoneyMask(bet));
		console.log(user.wallet, betValue);
		if (user.wallet >= betValue) {
			const payload = {
				user_id: user.id,
				event_id: card.id,
				modality: card.modality,
				odds: card.odds,
				bet: odd,
				bet_value: betValue,
				offer: false,
				status: 'open',
			};

			const { status, data } = await axios.post('/api/create-bet', payload);

			return Swal.fire({
				text: 'Boa sorte!',
				title: 'Proposta criada com sucesso',
				icon: 'success',
				confirmButtonText: 'Bora',
			});
		} else {
			return Swal.fire({
				text: 'Saldo Insuficiente',
				icon: 'error',
				confirmButtonText: 'Entendi',
			});
		}
	};

	return (
		<ColumnDivStyled>
			<RowDivStyled>
				{events?.map((event: Event, index: any) => (
					<div className="embla" ref={emblaRef}>
						<div className="embla__container">
							<div className="embla__slide__inner">
								<Container className="embla__slide" key={index}>
									<RowDivStyled>
										{event.modality === 'Futebol' ? (
											<FaFutbol size={10} className="mt-1 ml-3 is-flex" />
										) : (
											<MdSportsHandball
												size={30}
												className="mt-1 ml-3 is-flex"
											/>
										)}
										<Title>{event.name}</Title>
										<Title></Title>
									</RowDivStyled>

									<TeamName>{`1: ${event.teams[0]}`}</TeamName>
									<TeamName>{`2: ${event.teams[1]}`}</TeamName>
									<ButtonsDivStyled key={event.id}>
										<ButtonDivStyled>
											<p>Time 1</p>
											<button
												onClick={() => {
													setSelectedCard({
														name: event.name,
														teams: event.teams[0],
														id: event.id,
														modality: event.modality,
														odds: event.odds,
													});
													setSelectedOdd(event.odds[0]);
												}}
											>
												{event.odds[0]}
											</button>{' '}
										</ButtonDivStyled>

										<ButtonDivStyled>
											<p>Empate</p>
											<button
												onClick={() => {
													setSelectedCard({
														name: event.name,
														teams: 'Empate',
														id: event.id,
														modality: event.modality,
														odds: event.odds,
													});
													setSelectedOdd(event.odds[2]);
												}}
											>
												{event.odds[2]}
											</button>
										</ButtonDivStyled>
										<ButtonDivStyled>
											<p>Time 2</p>
											<button
												onClick={() => {
													setSelectedCard({
														name: event.name,
														teams: event.teams[1],
														id: event.id,
														modality: event.modality,
														odds: event.odds,
													});
													setSelectedOdd(event.odds[1]);
												}}
											>
												{event.odds[1]}
											</button>
										</ButtonDivStyled>
									</ButtonsDivStyled>
								</Container>
							</div>
						</div>
					</div>
				))}
			</RowDivStyled>
			{selectedCard ? (
				<div>
					<h2>
						{selectedCard.name} - {selectedCard.teams}
					</h2>
					<p>Odd: {selectedOdd}</p>
					<InputControlledCurrency
						control={control}
						style={{ width: '300px' }}
						name="bet"
						type="number"
						placeholder="Valor apostado em reais"
						precision="2"
						decimalSeparator=","
						thousandSeparator="."
						prefix="R$"
						error={errors.salary && errors.salary.message}
					/>
					<p>
						Retorno esperado: R$
						{(
							Number(selectedOdd) * Number(undoMoneyMask(getValues('bet')))
						).toFixed(2)}
					</p>
					<Button
						onClick={() => bet(selectedCard, selectedOdd)}
						text={'Apostar'}
					/>
				</div>
			) : null}
		</ColumnDivStyled>
	);
};
