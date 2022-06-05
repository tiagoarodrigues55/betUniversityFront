import styled from 'styled-components';

export const CardsSection = styled.section`
	display: flex;
	align-items: center;
	justify-content: center;

	width: 100%;
	margin: 2rem 0;
`;

export const TwoCards = styled.div`
	display: flex;
	align-items: center;
	justify-content: space-between;

	@media (max-width: 900px) {
		margin-bottom: 1rem;
	}
`;

export const TwoCardsSecond = styled.div`
	display: flex;
	align-items: center;
	justify-content: space-between;
	margin-left: 1rem;

	@media (max-width: 900px) {
		margin-bottom: 1rem;
	}
`;

export const CardDiv = styled.div`
	margin-left: 1rem;
`;