import { createGlobalStyle } from 'styled-components';

export const GlobalStyles = createGlobalStyle`
	* {
		box-sizing: border-box;
		margin: 0;
		padding: 0;
		font-family: 'Avant Garde', sans-serif;
	}

	body {
		background-color: #260539;
	}
`;

export const colors = {
	greenWater: '#E98AAF',
	orange: '#ff9900',
	darkPurple: '#A65F7C',
	primaryPurple: '#FF9FC5',
	purple: '#BC6D8D',
	gradient: 'linear-gradient(90deg, $dark-purple 0%, $primary-purple 100%)',
};
