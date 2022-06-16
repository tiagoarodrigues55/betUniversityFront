import { signIn } from 'next-auth/react';
import Logo from '../../components/Logo';
import * as S from './styles';

function LoginTemplate() {
	if (!window) {
		return
	}
	return (
		<S.Wrapper>
			<div>
				<Logo />
				{
					(window && window?.navigator?.userAgent.includes("Instagram")) ?
						<a href={window?.location.href} target="_blank" download>
							<S.SignInButton>
								Entre com o google
							</S.SignInButton>
						</a>
						:
						<S.SignInButton
							onClick={() =>
								signIn('google', {
									callbackUrl: `${window?.location.origin}/home`,
								})
							}
						>
							Entre com o google
						</S.SignInButton>
				}

			</div>
		</S.Wrapper>
	);
}

export default LoginTemplate;
