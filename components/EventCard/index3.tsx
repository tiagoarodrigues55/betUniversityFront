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
import { useAuth, getUser } from '../../hooks/auth/auth';
import { InputControlledCurrency } from '../InputControlledCurrency';
import { moneyMask, undoMoneyMask } from '../../utils/masks';
import { Button } from '../Button';
import Swal from 'sweetalert2';

interface Card {
	name: string;
	teams: string[];
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
	const [User, setUser] = useState(user)

	const [events, setEvents] = useState<Event[]>();

	const [selectedCard, setSelectedCard] = useState<Card>();

	const [selectedOdd, setSelectedOdd] = useState<number>();

	const [expectedReturn, setExpectedReturn] = useState('00,00');

	const [emblaRef] = useEmblaCarousel({
		inViewThreshold: 2,
		align: 'start',
	});

	const {
		control,
		handleSubmit,
		formState: { errors },
		getValues,
	} = useForm({ resolver: yupResolver(BetSchema) });

	useEffect(() => {
		setUser(user)
	}, [user])

	useLayoutEffect(() => {
		getEvents();
	}, []);

	const getEvents = async () => {
		const { status, data } = await axios.get('/api/get-event');

		setEvents(data.events);
	};

	function useExternalValue() {
		return undoMoneyMask(getValues('bet')) ? false : true
	}

	const bet = async (card, odd) => {
		const bet = getValues('bet');
		const betValue = Number(undoMoneyMask(bet));
		if (user.wallet >= betValue) {
			const payload = {
				user_id: user.id,
				event_id: card.id,
				event_name: card.name,
				teams: card.teams,
				modality: card.modality,
				odds: card.odds,
				bet: card.odds.indexOf(odd),
				bet_value: betValue,
				offer: false,
				status: 'open',
			};

			const { status, data } = await axios.post('/api/create-bet', payload);
			User.wallet -= betValue
			setData(User)
			setUser(getUser())
			getEvents()
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
	function onChange(value) {
		// setBetValue(Number(undoMoneyMask(value)))
		setExpectedReturn((Number(selectedOdd) * Number(undoMoneyMask(value))).toFixed(2))
	}

	return (
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
				onChange={onChange}
				prefix="R$"
				error={errors.salary && errors.salary.message}
			/>
			<p>
				Retorno esperado: R$
				{expectedReturn}
			</p>
			<Button
				onClick={() => bet(selectedCard, selectedOdd)}
				text={'Apostar'}
			/>
			Saldo: {User.wallet.toFixed(2)}
		</div>
	);
};
