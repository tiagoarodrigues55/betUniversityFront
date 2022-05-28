import styled from "styled-components";

export const Container = styled.div`
	width: 300px;
	padding: 1.2rem 0.8rem 1.2rem 0.8rem;
	border-radius: 0.5rem;
	background-color: #ffffff;
	margin: 1rem 1rem;

	display: flex;
	flex-direction: column;
	justify-content: space-between;
	box-shadow: 0px 12px 39px #0000000d;
	cursor: pointer;

	@media (max-width: 900px) {		
		padding: 0.5rem 0.2rem 1.2rem 0.2rem;
		width: 250px;
	}
`;

export const RowDivStyled = styled.div`
	display: flex;
	justify-content: space-between;
	flex-direction: row;

	margin-left: 3rem;
	width: 100%;
`;

export const ColumnDivStyled = styled.div`
	display: flex;
	flex-direction: column;
	margin-bottom: 10rem;
`;

export const ButtonsDivStyled = styled.div`
	display: flex;
	justify-content: space-between;
	flex-direction: row;
	padding: 0.5rem 2rem;
`;

export const ButtonDivStyled = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
`;

export const Title = styled.h1`
	font-size: 0.8rem;
	font-weight: 600;
	font-family: "Montserrat";
	color: #303a66;

	@media (max-width: 900px) {	
		font-size: 0.9rem;
	}	
`;

export const TeamName = styled.h2`
	font-size: 1.4rem;
	font-weight: 600;
	font-family: "Montserrat";
	color: #303a66;

	@media (max-width: 900px) {	
		font-size: 0.9rem;
		margin: 0rem 1rem;
	}	
`;