import { NextApiRequest, NextApiResponse } from 'next';

import { supabase } from '../../services/supabaseClient';

import { getOdds } from '../../utils/getOdds';

export default async function getEvents(
	req: NextApiRequest,
	res?: NextApiResponse
) {

		const findEvent = await supabase
			.from('events')
			.select('*')
			.eq('status', 'open');

			return res
				.status(200)
				.json({ status: 'Bora apostar!', events: findEvent.body });
}
