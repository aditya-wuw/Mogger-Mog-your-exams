import axios from 'axios'
import { redirect } from 'next/navigation'

export const SignIn_ = async (data: object): Promise<string> => {
    const res = await axios.post('/api/auth/signUp', data)
    if (res.data.success) {
        redirect('/home')
    }
    else {
        return res.data.message
    }
}

export const SignIn_goolge = async () => {
    const GOOGLE_CLIENT_ID = process.env.NEXT_PUBLIC_AUTH_GOOGLE_ID;
    const REDIRECT_URI = process.env.NEXT_PUBLIC_baseURL+"/api/auth/google/callback";
    const SCOPE = "openid email profile";
    const googleAuthUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${GOOGLE_CLIENT_ID}&redirect_uri=${encodeURIComponent(
        REDIRECT_URI
    )}&response_type=code&scope=${encodeURIComponent(SCOPE)}&access_type=offline&prompt=consent`;
    window.location.href = googleAuthUrl;
}

