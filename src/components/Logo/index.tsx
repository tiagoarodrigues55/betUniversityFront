import * as S from './styles';

type LogoProps = {
	variant?: 'purple' | 'gold' | 'white';
};

function Logo({ variant = 'gold' }: LogoProps) {
	return (
		<S.Wrapper variant={variant}>
			<span><b>inter</b></span> <span><b>bet</b></span>
		</S.Wrapper>
	);
}

export default Logo;
