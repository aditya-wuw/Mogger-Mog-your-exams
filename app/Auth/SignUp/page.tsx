import GreenBlob from '@/components/GreenBlob'
import Form from '@/components/Login/SignUp/Form'
import React from 'react'

const page = () => {
  return (
    <div className='w-full min-h-screen flex justify-center items-center'>
        <Form/>
        <GreenBlob/>
    </div>
  )
}

export default page
