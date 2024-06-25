import React from 'react'
import Sidebar from '../components/Sidebar'
import WordOfTheDay from '../components/WordOfTheDay'
import Pitches from '../components/Pitches'

const Page = () => {
  return (
    <div className='flex'>
      <Sidebar />
      <div className='w-[64%] divide-y-4 divide-[#393E46]'>
        <div className='w-full h-[50vh] py-2'>
          <h1 className='text-[#FFD369] text-2xl w-fit mx-auto'>Analytic Graph</h1>
        </div>
        <div className='w-full h-[50vh] py-2'>
          <h1 className='text-[#FFD369] text-2xl w-fit mx-auto'>Notes</h1>
        </div>
      </div>
      <div className='flex flex-col w-[26%] h-[100vh] divide-y-4 divide-[#222831] bg-[#393E46]'>
        <WordOfTheDay />
        <Pitches />
      </div>
    </div>
  )
}

export default Page
