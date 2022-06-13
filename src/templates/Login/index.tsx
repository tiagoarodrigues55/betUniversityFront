import { signIn } from 'next-auth/react';
import Logo from '../../components/Logo';
import * as S from './styles';

function LoginTemplate() {
	return (
		<S.Wrapper>
			<div>
				<Logo />
				<S.SignInButton
					onClick={() =>
						signIn('google', {
							callbackUrl: `${window.location.origin}/home`,
						})
					}
				>
					Entre com o google
				</S.SignInButton>
			</div>
		</S.Wrapper>
	);
}

export default LoginTemplate;
