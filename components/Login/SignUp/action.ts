import axios from 'axios'
import { redirect } from 'next/navigation'

export const SignIn_ = async(data:object):Promise<string> =>{
    const res = await axios.post('/api/auth/signUp',data)
    if(res.data.success){
        redirect('/home')
    }
    else{
        return res.data.message
    }
}

const SignIn_goolge = async () =>{
    console.log("google")
}

export default SignIn_goolge;