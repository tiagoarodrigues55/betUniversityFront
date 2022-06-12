import * as S from './styles';

type LogoProps = {
	variant?: 'purple' | 'gold' | 'white';
};

function Logo({ variant = 'gold' }: LogoProps) {
	return (
		<S.Wrapper variant={variant}>
			<span>inter</span> <span>bet</span>
		</S.Wrapper>
	);
}

export default Logo;
