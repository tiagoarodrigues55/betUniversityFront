import { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';
import 'dotenv/config';
import { supabase } from '../../services/supabaseClient';
import updateEvent from '../../utils/update-event';

export default async function createBet(
	req: NextApiRequest,
	res: NextApiResponse
) {
	const { user_id, event_id, event_name, teams, modality, odds, bet, bet_value, offer } = req.body;
	const newBet = {
		user_id,
		event_id,
		modality,
		odds,
		bet,
		bet_value,
		offer,
		event_name,
		teams,
		status: 'close',
		result: null
	};

	const createBet = await supabase.from('bets').insert(newBet);
	const event = await updateEvent(newBet)
	const user = await supabase.from('users').select('*').eq('id', user_id).single();
	user.data.wallet -= bet_value
	const updateUser = await supabase.from('users').update(user.data).match({ id: user_id })
	if (createBet.error || event.error) {
		return res
			.status(201)
			.json({ status: 'Ocorreu algum erro' });
	} else {
		return res
			.status(200)
			.json({ status: 'Boa, aposta realizada com sucesso' });
	}
}
