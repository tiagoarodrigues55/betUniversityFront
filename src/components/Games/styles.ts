import styled from 'styled-components';

export const Wrapper = styled.section`
	width: 100%;
	padding: 2rem 1.6rem;
	background-color: #3a1653;
	padding-bottom: 5rem;

	span {
		color: green;
		font-weight: bold;
	}
`;

export const Game = styled.div`
	margin-bottom: 30px;
	color: #fff;

	p {
		margin-top: 16px;
	}
`;

export const GameInfo = styled.div`
	display: flex;
	align-items: center;
	justify-content: space-between;
`;
export const Name = styled.h3`
	font-size: 24px;
	font-weight: bold;
`;

export const Info = styled.div``;

export const TeamInfo = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;

	margin-top: 1rem;
`;
export const Title = styled.div`
	display: flex;
	align-items: center;
	gap: 16px;
	font-weight: bold;

	.image {
		position: relative;
		width: 2.4rem;
		height: 2.4rem;
		border-radius: 50%;
		overflow: hidden;
	}
`;

export const Draw = styled.div`
	margin-top: 20px;
	display: flex;
	align-items: center;
	justify-content: space-between;
`;

export const BetButton = styled.button`
	padding: 0.7rem 1.5rem;
	border: 1px solid orange;
	background: transparent;
	cursor: pointer;
	border-radius: 40px;
	color: #ffffff;
`;
