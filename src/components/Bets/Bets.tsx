import { useState, useEffect } from 'react'
import axios from 'axios'
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup'
function Bets({ user_id }) {

	const [status, setStatus] = useState("close")
	const [data, setData] = useState([])
	useEffect(() => {
		axios.post(`/api/get-bets?user_id=${Number(user_id)}`,).then(res => {
			setData(res.data.bets?.filter(bet => bet.status === status) || [])
		})
	}, [user_id, status])

	const handleChange = (
		event: React.MouseEvent<HTMLElement>,
		newAlignment: string,
	) => {
		setStatus(newAlignment);
	};


	return (
		<>
			<ToggleButtonGroup
				color="primary"
				value={status}
				exclusive
				onChange={handleChange}
			>
				<ToggleButton value="open">Abertas</ToggleButton>
				<ToggleButton value="close">Fechadas</ToggleButton>
			</ToggleButtonGroup>
			{
				data.map(bet => {
					if (!bet.event_name) {
						return null
					}
					return (
						<div >
							<h2>{bet.event_name} - {bet.teams[0]} X {bet.teams[1]}</h2>
							<br />
							<p>{bet.teams[bet.bet]} @ {bet.odds[bet.bet]}</p>
							<br />
							<p>Valor apostado: {bet.bet_value}  Retorno: {(bet.result === bet.bet || !bet.result ? bet.odds[bet.bet] * bet.bet_value : 0).toFixed(2)}</p>
						</div>
					)
				})
			}
		</>
	)
}

export default Bets