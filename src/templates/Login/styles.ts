import styled from 'styled-components';

export const Wrapper = styled.div`
	display: grid;
	place-items: center;
	width: 100vw;
	height: 100vh;

	p {
		justify-content: center;
    font-size: 2rem;
	}
`;

export const SignInButton = styled.button`
	padding: 1rem;
	border-radius: 5px;
	background-color: orange;
	color: #fff;
	border: 0;
	margin: 2rem auto;
	display: block;
	cursor: pointer;
	font-size: 1.4rem;
`;

export const Description = styled.p`
	text-align: center;
	font-size: 10px;
	color: #ffffff;
`;
