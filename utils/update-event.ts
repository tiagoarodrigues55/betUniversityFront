import { NextApiRequest, NextApiResponse } from 'next';

import axios from 'axios';
import 'dotenv/config';
import { supabase } from '../services/supabaseClient';
import { updateOdds } from './updateOdds';

export default async function updateGame(body) {
	const { odds, bet, bet_value, game_id } = body;
	const game = await supabase.from('games').select('*').eq('id', game_id).single();
	if (!game.data) {
		return game;
	}
	const oldGame = game.data;
	const newBets = oldGame.bets.map((currentBet, index) =>
		index === bet ? currentBet + 1 : currentBet
	);
	const newPayments = oldGame.payments.map((payments, index) =>
		index === bet ? payments + bet_value : payments
	);
	const newDebts = oldGame.debts.map((debts, index) => {
		console.log(index, bet, bet_value, odds)
		return index === bet ? debts + bet_value * odds[bet] : debts
	}
	);
	const newGame = {
		odds: updateOdds(newDebts),
		bets: newBets,
		payments: newPayments,
		debts: newDebts,
	};
	return await supabase.from('events').update(newGame).match({ id: game_id })
}
