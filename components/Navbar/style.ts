import styled from 'styled-components';

export const BackgroundDiv = styled.div`
	top: 0;
	left: 0;
	position: fixed;
	width: 100vw;
	height: 100vh;
	z-index: 98;
	background: rgba(10, 10, 10, 0.4);
`;

export const DrawerDivStyled = styled.div`
	position: fixed;
	top: 0;
	right: 0;
	width: 70vw;
	height: 100vh;
	background-color: #ffffff;
	z-index: 99;
	transition: all 2s ease-out;
`;

export const ErrorDivStyled = styled.div`
	width: 190px;
	white-space: pre-wrap;
`;

export const ErrorStyled = styled.small`
	font-family: 'Montserrat';
	font-size: 12px;
	text-align: start;
	color: hsl(348, 100%, 61%);
`;

export const TooltipDivStyled = styled.div`
	display: inline;
	flex-direction: row;
`;

export const GroupStyled = styled.div`
	flex-direction: row;
	white-space: nowrap;
`;
