import { useGoogleLogin } from "@react-oauth/google";

const GoogleLoginButton: React.FC = () => {
	const login = useGoogleLogin({
		onSuccess: (tokenResponse) => console.log(tokenResponse),
	});

	return (
		<div>
			<button onClick={() => login()}>Login with google✌</button>
		</div>
	);
};

export default GoogleLoginButton;