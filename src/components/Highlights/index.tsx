import Image from 'next/image';
import * as S from './styles';

type HighlightsProps = {
	games: any[];
	handleOpenModal: (game: any) => void;
};

const fakeData = [
	{
		id: 1,
		name: 'Final de Futebol',
		teams: ['FGV', 'UNESP'],
		odds: [1.5, 1, 1.3],
	},
	{
		id: 2,
		name: 'Final de Futsal',
		teams: ['FGV', 'UNESP'],
		odds: [1.5, 1, 1.3],
	},
];

function Highlights({ games, handleOpenModal }: HighlightsProps) {
	return (
		<S.Wrapper>
			<h2>Destaques</h2>
			<S.GamesWrapper>
				{games.map((game) => (
					<S.Game key={game.id}>
						<header>{game.name}</header>
						<S.GameContent>
							<S.GameImage>
								<Image
									src={`/universities/${game.teams[0]}.jpeg`}
									layout="fill"
									objectFit="cover"
								/>
							</S.GameImage>
							<S.Teams>
								<S.Team>
									<span className="team-name">{game.teams[0]}</span>
									<span className="odd">x{game.odds[0]}</span>
								</S.Team>
								<S.Team>
									<span className="team-name">{game.teams[1]}</span>
									<span className="odd">x{game.odds[1]}</span>
								</S.Team>
							</S.Teams>
							<S.GameImage>
								<Image
									src={`/universities/${game.teams[1]}.jpeg`}
									layout="fill"
									objectFit="cover"
								/>
							</S.GameImage>
						</S.GameContent>
            <S.Button onClick={() => handleOpenModal({ game })}>Apostar</S.Button>
					</S.Game>
				))}
			</S.GamesWrapper>
		</S.Wrapper>
	);
}

export default Highlights;
