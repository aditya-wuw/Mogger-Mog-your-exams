import GettingStarted from '@/components/gettingstarted'
import GreenBlob from '@/components/GreenBlob'
import NavBar from '@/components/NavBar'
import React from 'react'
const page = () => {
  return (
    <div className='w-full'>
      <nav className='w-full flex justify-center'>
        <NavBar/>
      </nav>
      <main>
        <GreenBlob/>
        <section className='lg:mx-20 mx-3 mt-5'>
            <GettingStarted/>
        </section>
      </main>
    </div>
  )
}

export default page
