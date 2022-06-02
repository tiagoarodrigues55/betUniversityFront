import { NextApiRequest, NextApiResponse } from 'next';

import { supabase } from '../../services/supabaseClient';

export default async function getBets(
	req: NextApiRequest,
	res?: NextApiResponse
) {
	console.log(req.body)
	const findBets = await supabase
		.from('bets')
		.select('*')
		.eq('user_id', req.body.user_id);

	return res
		.status(200)
		.json({ status: 'Bora apostar!', bets: findBets.body });
}
