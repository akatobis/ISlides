// import  { GoogleLogin } from '@react-oauth/google';
// import { GoogleOAuthProvider } from '@react-oauth/google';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { gapi } from 'gapi-script';
import { useEffect } from 'react';
import GoogleLoginButton from './GoogleLogin/GoogleLogin';
import FilePicker from "react-google-drive-picker";
import useDrivePicker from 'react-google-drive-picker';

function GoogleAuth() {
   const apiKey: string = 'AIzaSyCPQZIczrkndXnfZO8C52f0yNnx63tyDog';
   const googleClientId: string = '938918849952-16jqke98e1mtbo2a2v66m736jl9p7eun.apps.googleusercontent.com';
   const token: string = "ya29.a0AX9GBdU0u3AvDcBzG3ahWvqg65GUBQ8PvUPj45z1v95q7_NfGN8IuTfm1rUJl0W5-56Hi2YICXlgMsblZ-CCSwZhIheGsOV6zGMPYz9-dUGZSFOY5fn1EN8EVDc0Fj9ytLZstwhQpNLh0OX2XwghtKLNxBXraCgYKAagSARMSFQHUCsbCCAReGwtHZuNXvp9IrMTlgg0163";

   const [openPicker, authResponse] = useDrivePicker();  
   
  const handleOpenPicker = () => {
    openPicker({
      clientId: googleClientId,
      developerKey: apiKey,
      viewId: "DOCS",
      token: token,
      showUploadView: true,
      showUploadFolders: true,
      supportDrives: true,
      multiselect: true,
      callbackFunction: (data) => {
        if (data.action === 'cancel') {
          console.log('User clicked cancel/close button')
        }
        console.log(data)
      },
    })
  }

   return (
      <>
            <button onClick={() => handleOpenPicker()}>Open Picker</button>
      </>
   )
}

export default GoogleAuth
