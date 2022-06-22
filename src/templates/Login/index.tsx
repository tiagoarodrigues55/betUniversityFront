import { signIn } from 'next-auth/react';
import Logo from '../../components/Logo';
import * as S from './styles';

function LoginTemplate() {
	if (typeof window !== "undefined") {
		return (
			<S.Wrapper>
				<div>
					<Logo />
					{
						(window?.navigator?.userAgent.includes("Instagram")) ?
							<a href="https://interbet.vercel.app" target="_blank" download>
								<S.SignInButton>
									Entre com o google
								</S.SignInButton>
							</a>
							:
							<S.SignInButton
								onClick={() =>
									signIn('google', {
										callbackUrl: "https://interbet.vercel.app",
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
	return <></>
}

export default LoginTemplate;
