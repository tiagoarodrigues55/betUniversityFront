import styled from 'styled-components';

export const Wrapper = styled.div`
  display: grid;
  place-items: center;
  width: 100vw;
  height: 100vh;

  h1 {
    text-align: center;
  }
`

export const SignInButton = styled.button`
	padding: 1rem;
	border-radius: 5px;
	background-color: orange;
	color: #fff;
	border: 0;
	margin: 2rem auto;
	display: block;
  cursor: pointer;
`;