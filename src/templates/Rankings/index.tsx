import { useState } from 'react';
import { useQuery } from 'react-query';
import api from '../../services/api';
import * as S from './styles';

function RankingsTemplate() {
	const [option, setOption] = useState('users');

	const { data } = useQuery(['ranking', option], async () => {
		const response = await api.get('/users');
		var groupBy = function (xs, key) {
			return xs.reduce(function (rv, x) {
				(rv[x[key]] = rv[x[key]] || []).push(x);
				return rv;
			}, {});
		};
		if (option === 'users') {
			return response.data.sort((a, b) => b.score - a.score)
		}
		const finalResponse = []
		Object.entries(groupBy(response.data, 'favorite_team')).forEach(([key, value]) => {
			finalResponse.push({ name: key, score: value.map(user => user.score).reduce((previousValue, currentValue) => previousValue + currentValue) })
		})
		return finalResponse
	});

	return (
		<S.Wrapper>
			<h1>Ranking por {option === 'users' ? 'usuário' : 'faculdade'}</h1>
			<S.ButtonContainer>
				<S.Button
					isActive={option === 'users'}
					onClick={() => setOption('users')}
				>
					Usuários
				</S.Button>
				<S.Button
					isActive={option === 'team'}
					onClick={() => setOption('team')}
				>
					Faculdades
				</S.Button>
			</S.ButtonContainer>
			<S.RankingList>
				{data?.map((item) => (
					<S.RankingItem key={item.id}>
						<span>{item?.name}</span>
						<span>{item?.score} pontos</span>
					</S.RankingItem>
				))}
			</S.RankingList>
		</S.Wrapper>
	);
}

export default RankingsTemplate;
