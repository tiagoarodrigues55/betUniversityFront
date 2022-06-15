// registers in JSON file for simplicity, store in a db for production applications
import { supabase } from './supabaseClient';
import { updateOdds } from '../utils/updateOdds';

export const users = {
	getUserByEmail: async (email) =>
		await supabase.from('users').select('*').eq('email', email).single(),
	getUserById: async (id) =>
		await supabase.from('users').select('*').eq('id', id).single(),
	getAll: async () => await supabase.from('users').select('*'),
	create: async (register) => await supabase.from('users').insert(register),
	update: async (email, params) =>
		await supabase.from('users').update(params).match({ email }),
};

export const games = {
	getGameByName: async (name) =>
		await supabase.from('games').select('*').eq('name', name).single(),
	getGameById: async (id) =>
		await supabase.from('games').select('*').eq('id', id).single(),
	getGamesByProps: async (propValue, propName) =>
		await supabase.from('games').select('*').eq(propName, propValue),
	getGamesByMultipleProps: async (propOne, propTwo) =>
		await supabase.from('games').select('*').eq(propOne.name, propOne.value).eq(propTwo.name, propTwo.value),
	getAll: async () => await supabase.from('games').select('*'),
	create: async (register) => await supabase.from('games').insert(register),
	update: async (name, params) =>
		await supabase.from('games').update(params).match({ name }),
	getOldGames: async (date) =>
		await supabase.from('games').select('name')
			.lt('date', date).eq('status', 'open'),
	lockGames: async (names) => await supabase.rpc('lockgames2', { names })
};

export const bets = {
	getBetsByGameId: async (game_id) =>
		await supabase.from('bets').select('*').eq('game_id', game_id),
	getBetsByUserId: async (user_id) =>
		await supabase.from('bets').select('*').eq('user_id', user_id),
	getBetsByProps: async (propValue, propName) =>
		await supabase.from('bets').select('*').eq(propName, propValue),
	getBetsByMultipleProps: async (propOne, propTwo) =>
		await supabase.from('bets').select('*').eq(propOne.name, propOne.value).eq(propTwo.name, propTwo.value),
	getAll: async () => await supabase.from('bets').select('*'),
	create: async (register) => await supabase.from('bets').insert(register),
	update: async (id, params) =>
		await supabase.from('bets').update(params).match({ id }),
	updateGame,
	// updateUser: async (bet_value, id) => await supabase.rpc('updateuserwallet', { bet_value: Number(bet_value), id })
	updateUser: async (bet_value, id) => {
		const user = await users.getUserById(id)
		user.data.wallet = user.data.wallet - bet_value
		const response = await users.update(user.data.email, user.data)
		return response
	}

};


async function updateGame(body) {
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
	return await supabase.from('games').update(newGame).match({ id: game_id })
}
