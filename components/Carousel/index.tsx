import React from 'react';
import EventCard from '../EventCard'

function Carousel({ events, selectOdd }) {
	return (
		events.map((event) => (
			<EventCard
				event={event}
				selectOdd={selectOdd}
				key={event.id}
			/>
		))
	);
}

export default Carousel;
