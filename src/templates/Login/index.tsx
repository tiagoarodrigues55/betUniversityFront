import { signIn } from 'next-auth/react';
import Logo from '../../components/Logo';
import * as S from './styles';

function LoginTemplate() {
	console.log()
	return (
		<S.Wrapper>
			<div>
				<Logo />
				<S.SignInButton
					onClick={() => {
						// if (window.navigator.userAgent.includes("Instagram")) {
						<a href={window.location.href} target="_blank" download>
							{signIn('google', {
								callbackUrl: `${window.location.origin}/home`,
							})}
						</a>
						// } else {
						// 	signIn('google', {
						// 		callbackUrl: `${window.location.origin}/home`,
						// 	})
						// }
					}
					}
				>
					Entre com o google
				</S.SignInButton>
				<S.SignInButton
					onClick={() =>
						signIn('facebook', {
							callbackUrl: `${window.location.origin}/home`,
						})
					}
				>
					Entre com o facebook
				</S.SignInButton>
			</div>
		</S.Wrapper>
	);
}

export default LoginTemplate;
