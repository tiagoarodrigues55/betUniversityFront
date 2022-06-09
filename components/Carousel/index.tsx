import React from 'react';
import GameCard from '../GameCard'

function Carousel({ games, selectOdd }) {
	return (
		games.map((game) => (
			<GameCard
				game={game}
				selectOdd={selectOdd}
				key={game.id}
			/>
		))
	);
}

export default Carousel;
