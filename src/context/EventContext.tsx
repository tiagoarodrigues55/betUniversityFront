import { createContext, useContext, useEffect, useState } from 'react';

type EventContextData = {
	event: string;
	changeEvent: (event: string) => void;
};

const EventContext = createContext({} as EventContextData);

export function EventProvider({ children }) {
	const [event, setEvent] = useState('integramix');

	useEffect(() => {
		if (localStorage.getItem('interbet.event')) {
			setEvent(localStorage.getItem('interbet.event'));
		}
	}, []);

	function changeEvent(event: string) {
		setEvent(event);
		localStorage.setItem('interbet.event', event);
	}

	return (
		<EventContext.Provider value={{ event, changeEvent }}>
			{children}
		</EventContext.Provider>
	);
}

export default function useEvent() {
	return useContext(EventContext);
}
