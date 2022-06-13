import { signIn } from 'next-auth/react';
import * as S from './styles';

function LoginTemplate() {
	return (
		<S.Wrapper>
			<div>
				<h1>Entre com o Google</h1>
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
