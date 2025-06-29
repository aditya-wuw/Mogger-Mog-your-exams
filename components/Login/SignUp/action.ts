import axios from 'axios'
import { redirect } from 'next/navigation'

export const SignIn_ = async(data:object)=>{
    const res = await axios.post('/api/auth/signUp',data)
    console.log(res)
    if(res.data.success){
        redirect('/home')
    }
    else{
        redirect('/error')
    }
}

const SignIn_goolge = async () =>{
    console.log("google")
}

export default SignIn_goolge;