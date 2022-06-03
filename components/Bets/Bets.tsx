import { useState, useEffect } from 'react'
import axios from 'axios'
import { useAuth } from '../../hooks/auth/auth'

function Bets({ user_id }) {
	const [data, setData] = useState([])

	useEffect(() => {
		axios.post('/api/get-bets', { user_id }).then(res => {
			console.log(res.data.bets)
			setData(res.data.bets || [])
		})
	}, [])



	return (
		<>
			{
				data.map(bet => {
					return (
						<div>
							<h2>{bet.event_name} - {bet.teams[0]} X {bet.teams[1]}</h2>
							<br />
							<p>{bet.teams[bet.bet]} @ {bet.odds[bet.bet]}</p>
							<br />
							<p>Valor apostado: {bet.bet_value}  Retorno: {bet.result === bet.bet || !bet.result ? bet.odds[bet.bet] * bet.bet_value : 0}</p>
						</div>
					)
				})
			}
		</>
	)
}

export default Bets