import Link from 'next/link'
import React from 'react'

const page = () => {
  return (
    <div className='m-5'>
       will be available soon 
      <Link href={'/home'} className='p-2 bg-green-500 rounded-2xl ml-2'>Go back</Link >
    </div>
  )
}

export default page