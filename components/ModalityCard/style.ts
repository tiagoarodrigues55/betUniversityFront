import styled from "styled-components";

export const Container = styled.div`
	width: 12rem;
	height: 12rem;
	padding: 1.2rem 0.8rem 1.2rem 0.8rem;
	border-radius: 0.5rem;
	background-color: #ffffff;

	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: space-between;
	box-shadow: 0px 12px 39px #0000000d;

	@media (max-width: 900px) {		
		padding: 0.5rem 0.2rem 1.2rem 0.2rem;
		width: 5rem;
		height: 7rem;
	}
`;

export const Title = styled.h1`
	font-size: 1.2rem;
	font-weight: 600;
	font-family: "Montserrat";
	color: #303a66;

	@media (max-width: 900px) {	
		margin-top: 1rem;	
		font-size: 0.9rem;
	}	
`;

export const Text = styled.p`
	font-family: "Montserrat";
	font-size: 16px;
	color: #303a66;

	@media (max-width: 900px) {		
			font-size: 0.6rem;
			height: 50px;
	}
`;
