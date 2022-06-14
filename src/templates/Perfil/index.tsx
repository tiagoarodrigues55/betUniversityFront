import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import FormsProgress from '../../components/FormsProgress';
import LiquidCash from '../../components/LiquidCash';
import api from '../../services/api';
import * as S from './styles';

function ProfileTemplate() {
	const [option, setOption] = useState<'close' | 'open'>('open');
	const { data: session } = useSession();
	const shareUrl = `https://interbet.vercel.app/login?afiliation_id=${session?.user?.id || 188}`

	const { data } = useQuery('bets', async () => {
		const response = await api.get(`/api/bets/${session?.user?.id || 188}`);
		return response.data;
	});

	return (
		<S.Wrapper>
			<h1>Informações do usuário</h1>
			<S.UserInfo>
				<div>
					<span>Nome:</span>
					<b>{session?.user?.name}</b>
				</div>
				<div>
					<span>Saldo:</span>
					<b>{session?.user?.wallet}</b>
				</div>
				<div>
					<span>Pontos da base:</span>
					<b>{session?.user?.score}</b>
				</div>
				<div>
					<span>Pontos convertidos:</span>
					<b>{session?.user?.total_bet}</b>
				</div>
			</S.UserInfo>

			<S.Hr />

			<S.UserProgress>
				<h2>Progresso do usuário</h2>
				<FormsProgress progress={session?.user?.forms_progress} />
			</S.UserProgress>

			<S.Hr />

			<S.UserLiquid>
				<h2>Liquidar</h2>
				<LiquidCash onClick={() => console.log('oi')} />
			</S.UserLiquid>

			<S.Hr />
			<S.whatsappButton href={`https://api.whatsapp.com/send?text=${shareUrl}`}>
				<button>
					<b>Convide um amigo</b>
				</button>
			</S.whatsappButton>
			<S.Bets>
				<h2>Minhas apostas</h2>
				<S.SelectContainer>
					<S.Select
						isActive={option === 'open'}
						onClick={() => setOption('open')}
					>
						Abertas
					</S.Select>
					<S.Select
						isActive={option === 'close'}
						onClick={() => setOption('close')}
					>
						Fechadas
					</S.Select>
				</S.SelectContainer>
				<S.BetsContainer>
					{data?.filter(bet => bet.status === option).map((bet, index) => (
						<S.Bet key={index}>
							<h3>
								{bet?.game_name} - {bet?.teams[0]} X {bet?.teams[1]}
							</h3>
							<p>
								<span>Time apostado: </span>
								{bet?.teams[bet?.bet]} @ {bet?.odds[bet?.bet]}
							</p>
							<S.BetValues>
								<p>Valor apostado: {bet?.bet_value}</p>
								<p>
									Retorno:{' '}
									{(bet?.result === bet?.bet || !bet?.result
										? bet?.odds[bet?.bet] * bet?.bet_value
										: 0
									).toFixed(2)}
								</p>
							</S.BetValues>
						</S.Bet>
					))}
				</S.BetsContainer>
			</S.Bets>
		</S.Wrapper >
	);
}

export default ProfileTemplate;
