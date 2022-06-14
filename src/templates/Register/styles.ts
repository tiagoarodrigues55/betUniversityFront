import styled from 'styled-components';

export const Wrapper = styled.div`
	display: grid;
	place-items: center;
	width: 100vw;
	height: 100vh;
`;

export const Container = styled.div`
	max-width: 40rem;
  width: 100%;
	background-color: #f5f8fa;
	padding: 2rem;

	h1 {
		text-align: center;
	}

	p {
		margin-top: 1rem;
	}
`;

export const Form = styled.form`
  margin: 2rem 0;
    input {
      padding: .8rem;
      background: white;
      border: none;
      border: 5px;
      outline: none;
    }
  div.text {
    display: flex;
    flex-direction: column;
    gap: 16px;

    input {
      padding: .8rem;
      background: white;
      border: none;
      border: 5px;
      outline: none;
    }
  }
	div.number {
    display: flex;
    flex-direction: column;
    gap: 16px;

    input {
      padding: .8rem;
      background: white;
      border: none;
      border: 5px;
      outline: none;
    }
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

export const whatsappButton = styled.a`
	button {
    padding: 1rem;
    border-radius: 5px;
    background-color: orange;
    color: #fff;
    border: 0;
    margin: 2rem auto;
    display: block;
    cursor: pointer;
	}
`