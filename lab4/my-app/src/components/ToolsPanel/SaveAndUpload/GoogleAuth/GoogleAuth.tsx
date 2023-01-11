// import  { GoogleLogin } from '@react-oauth/google';
// import { GoogleOAuthProvider } from '@react-oauth/google';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { gapi } from 'gapi-script';
import GoogleLoginButton from './GoogleLogin/GoogleLogin';

function GoogleAuth() {
   const apiKey: string = 'AIzaSyCPQZIczrkndXnfZO8C52f0yNnx63tyDog';
   const googleClientId: string = '938918849952-16jqke98e1mtbo2a2v66m736jl9p7eun.apps.googleusercontent.com';

   return (
      <>
         {/* <GoogleOAuthProvider clientId="<your_client_id>">...</GoogleOAuthProvider> */}
         {/* <GoogleLogin
            onSuccess={credentialResponse => {
               console.log(credentialResponse);
            }}
            onError={() => {
               console.log('Login Failed');
            }}
            useOneTap
         /> */}

         <GoogleOAuthProvider clientId={googleClientId}>
				<GoogleLoginButton />
			</GoogleOAuthProvider>
      </>
   )
}

export default GoogleAuth;