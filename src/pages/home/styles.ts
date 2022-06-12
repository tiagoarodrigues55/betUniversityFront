import styled from 'styled-components';

import { colors } from '../../styles/global';

export const ContainerStyled = styled.div`
	display: flex;
	margin: 0;
	padding: 0;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	width: 35%;
	background: hsl(0, 0%, 96%);

	@media (max-width: 2200px) {
		width: 42%;
	}

	@media (max-width: 1900px) {
		width: 50%;
	}

	@media (max-width: 1550px) {
		width: 60%;
	}

	@media (max-width: 1100px) {
		width: 65%;
	}

	@media (max-width: 1020px) {
		width: 95%;
	}
`;

export const ContainerReturnStyled = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	background: hsl(0, 0%, 96%);
`;

export const ContainerTemplateStyled = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	margin: 1rem 0;
`;

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

