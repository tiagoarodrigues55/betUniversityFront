import styled from 'styled-components';

export const Wrapper = styled.section`
	display: flex;
	flex-direction: column;
	gap: 1rem;
	overflow-x: auto;
	padding: 2rem 1.6rem;
	padding-right: 0;
	background-color: #3a1653;

	h2 {
		color: #ffff;
		font-size: 1.4rem;
	}
`;

export const GamesWrapper = styled.div`
	display: flex;
	gap: 1rem;
	overflow-x: auto;
	padding-right: 2rem;
`;

export const Game = styled.div`
	background-color: #271137;
	padding: 1rem 0.6rem;
	border-radius: 1rem;
	min-width: 16rem;

	display: flex;
	flex-direction: column;
	gap: 1.4rem;

	color: #fff;

	header {
		text-align: center;
	}
`;

export const GameContent = styled.div`
	color: #fff;

	display: grid;
	grid-template-columns: auto 1fr auto;
	gap: 0.4rem;
	margin-top: 0.6rem;
`;

export const GameImage = styled.div`
	position: relative;
  overflow: hidden;
	width: 2.4rem;
	height: 2.4rem;
	border-radius: 50%;
	background-color: #000;
`;

export const Teams = styled.div`
	display: flex;
	justify-content: space-between;
`;

export const Team = styled.div`
	display: flex;
	flex-direction: column;

	span {
		font-size: 0.8rem;
	}

	.team-name {
		font-weight: 500;
		font-size: 0.8rem;
	}

	.odd {
		color: green;
		margin-top: 0.5rem;
		display: inline-block;
	}
`;

export const Button = styled.button`
	padding: 0.7rem;
	background: transparent;
	border: 1px solid orange;
	border-radius: 0.5rem;

	width: 10rem;
	color: #fff;
	margin: 0 auto;
	cursor: pointer;
	font-weight: bold;
`;
