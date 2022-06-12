import { useState } from 'react';
import { useQuery } from 'react-query';
import api from '../../services/api';
import * as S from './styles';

function RankingsTemplate() {
	const [option, setOption] = useState('users');

	const { data } = useQuery(['ranking', option], async () => {
		const response = await api.get(`/${option === 'users' ? 'users' : `games?modality=`}`);

		if (option === 'users') {
			return response.data.data.sort((a, b) => b.score - a.score)
		}

		return response.data;
	});

	return (
		<S.Wrapper>
			<h1>Ranking de {option === 'users' ? 'usuários' : 'jogos'}</h1>
			<S.ButtonContainer>
				<S.Button
					isActive={option === 'users'}
					onClick={() => setOption('users')}
				>
					Usuários
				</S.Button>
				<S.Button
					isActive={option === 'games'}
					onClick={() => setOption('games')}
				>
					Jogos
				</S.Button>
			</S.ButtonContainer>
			<S.RankingList>
				{data?.map((item) => (
					<S.RankingItem key={item.id}>
						<span>{item?.name || 'Usuário'}</span>
						<span>{item?.score} pontos</span>
					</S.RankingItem>
				))}
			</S.RankingList>
		</S.Wrapper>
	);
}

export default RankingsTemplate;
