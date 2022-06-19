import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import FormsProgress from '../../components/FormsProgress';
import LiquidCash from '../../components/LiquidCash';
import api from '../../services/api';
import * as S from './styles';
import { QRCodeSVG } from 'qrcode.react';
import ModalAward from '../../components/ModalAward';

function ProfileTemplate() {
	const [option, setOption] = useState<'close' | 'open'>('open');
	const [modalOpen, setModalOpen] = useState(false);
	const [qrCode, setQrCode] = useState(null);
	const { data: session } = useSession();
	const shareUrl = `https://interbet.vercel.app/login?afiliation_id=${
		session?.user?.id || 188
	}`;

	const { data } = useQuery('bets', async () => {
		const response = await api.get(`/api/bets/${session?.user?.id || 188}`);
		return response.data;
	});

	return qrCode ? (
		<S.Backdrop onClick={() => setQrCode(null)}>
			<QRCodeSVG value={qrCode} />
		</S.Backdrop>
	) : (
		<S.Wrapper>
			<ModalAward
				isModalOpen={modalOpen}
				handleCloseModal={() => setModalOpen(false)}
				setQrCode={setQrCode}
			/>
			<h1>Informações do usuário</h1>
			<S.UserInfo>
				<div>
					<span>Nome:</span>
					<b>{session?.user?.name}</b>
				</div>
				<div>
					<span>Saldo:</span>
					<b>{session?.user?.wallet?.toFixed(2)}</b>
				</div>
				<div>
					<span>Pontos convertidos:</span>
					<b>{session?.user?.score}</b>
				</div>
			</S.UserInfo>

			<S.Hr />

			<S.UserProgress>
				<h2>Progresso do usuário</h2>
				<FormsProgress progress={session?.user?.forms_progress} />
			</S.UserProgress>

			<S.Hr />

			<S.UserLiquid>
				<h2>Redimir pontos</h2>
				<S.ButtonAward onClick={() => setModalOpen(true)}>
					Escolher os prêmios
				</S.ButtonAward>
				{/* <LiquidCash
					onClick={(value) =>
						setQrCode(
							`https://interbet.vercel.app/liquid?value=${value.replace(
								'R$',
								''
							)}&user_id=${session.user.id}`
						)
					}
				/> */}
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
					{data
						?.filter((bet) => bet.status === option)
						.map((bet, index) => (
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
										{(bet?.winner === bet?.bet || !bet.winner
											? bet?.odds[bet?.bet] * bet?.bet_value
											: 0
										).toFixed(2)}
									</p>
									<p>Resultado: {bet.result ? bet.result : null}</p>
								</S.BetValues>
							</S.Bet>
						))}
				</S.BetsContainer>
			</S.Bets>
		</S.Wrapper>
	);
}

export default ProfileTemplate;
