import { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';
import 'dotenv/config';
import { supabase } from '../../services/supabaseClient';

export default async function createBet(
	req: NextApiRequest,
	res: NextApiResponse
) {
	const { user_id, event_id, modality, odds, bet, bet_value, offer } = req.body;
	const newBet = {
		user_id,
		event_id,
		modality,
		odds,
		bet,
		bet_value,
		offer,
		status: 'open',
	};

	const createBet = await supabase.from('bets').insert(newBet);

	if( createBet.status !== 200 ) {
		return res
			.status(201)
			.json({ status: 'Ocorreu algum erro'});
	} else {
		return res
			.status(200)
			.json({ status: 'Boa, aposta realizada com sucesso' });
}
}
