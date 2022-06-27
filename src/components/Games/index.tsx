import Image from 'next/image';
import * as S from './styles';

type GamesProps = {
	games: any[];
	handleOpenModal: (game: any) => void;
};

function convertDate(date) {
	const dateObject = new Date(date);
	dateObject.setHours(dateObject.getHours() + 3);
	return dateObject;
}

function Games({ games, handleOpenModal }: GamesProps) {
	console.log(games);
	return (
		<S.Wrapper>
			{games?.map((game) => (
				<S.Game key={game.id}>
					<S.GameInfo>
						<S.Name>{game.name}</S.Name>
						<S.Info></S.Info>
					</S.GameInfo>
					<S.TeamInfo>
						<S.Title>
							<div className="image">
								<Image
									src={`/universities/${game.teams[0]}.jpeg`}
									layout="fill"
									objectFit="cover"
								/>
							</div>
							{game.teams[0]}
						</S.Title>
						<span>{game.odds[0]}</span>
					</S.TeamInfo>
					<S.TeamInfo>
						<S.Title>
							<div className="image">
								<Image
									src={`/universities/${game.teams[1]}.jpeg`}
									layout="fill"
									objectFit="cover"
								/>
							</div>{' '}
							{game.teams[1]}
						</S.Title>
						<span>{game.odds[1]}</span>
					</S.TeamInfo>
					<S.Draw>
						<span>{game.odds[2]}</span>
						<S.BetButton onClick={() => handleOpenModal({ game })}>
							Apostar
						</S.BetButton>
					</S.Draw>
					<p className="time">
						{game.place ? `${game.place} -` : null}{' '}
						{game.date
							? `${convertDate(game.date).toLocaleString().slice(0, 16)}`
							: null}
					</p>
				</S.Game>
			))}
		</S.Wrapper>
	);
}

export default Games;
