import styled, { css } from 'styled-components';

const wrapperModifiers = {
	purple: () => css`
		span:first-child {
			color: #5e308c;
		}

		span:last-child {
			color: #ea9840;
		}
	`,
	gold: () => css`
		span:first-child {
			color: #fff;
		}

		span:last-child {
			color: #ea9840;
		}
	`,
	white: () => css`
		span {
			color: #ffff;
		}
	`,
};

type WrapperProps = {
	variant: 'purple' | 'gold' | 'white';
};

export const Wrapper = styled.p<WrapperProps>`
	${({ variant }) => css`
		font-size: 24px;
		display: flex;
		font-family: Orbitron;
		${!!variant && wrapperModifiers[variant]};
	`}
`;
