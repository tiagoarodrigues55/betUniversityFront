import { NextApiRequest, NextApiResponse } from 'next';

import axios from 'axios';
import 'dotenv/config';
import { supabase } from '../services/supabaseClient';
import { updateOdds } from './updateOdds';

export default async function updateEvent(body) {
	const { odds, bet, bet_value, event_id } = body;
	const event = await supabase.from('events').select('*').eq('id', event_id).single();
	if (!event.data) {
		return event;
	}
	const oldEvent = event.data;
	const newBets = oldEvent.bets.map((currentBet, index) =>
		index === bet ? currentBet + 1 : currentBet
	);
	const newPayments = oldEvent.payments.map((payments, index) =>
		index === bet ? payments + bet_value : payments
	);
	const newDebts = oldEvent.debts.map((debts, index) => {
		console.log(index, bet, bet_value, odds)
		return index === bet ? debts + bet_value * odds[bet] : debts
	}
	);
	const newEvent = {
		odds: updateOdds(newDebts),
		bets: newBets,
		payments: newPayments,
		debts: newDebts,
	};
	console.log(newEvent)
	console.log(newDebts)
	return await supabase.from('events').update(newEvent).match({ id: event_id })
}
