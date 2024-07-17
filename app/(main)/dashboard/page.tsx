import React, { useEffect } from 'react'
import WordOfTheDay from '@/components/WordOfTheDay'
import Pitches from '@/components/Pitches'
import PieChart from '@/components/PieChart'
import Notes from '@/components/Notes'


const Page = () => {

  return (
    <div className='flex ml-[12%]'>
      <div className='divide-y-4 divide-[#393E46] w-full h-[100vh] overflow-y-auto'>
        <div className='w-full py-8 px-4 flex items-center justify-around h-[50vh]'>
          <div className='flex flex-col w-6/12'>
            <h1 className='text-[#FFD369] text-3xl font-medium'>Language Activity Report</h1>
            <p className='text-[#EEEEEE]'>See how you&#39;ve been spending your time practicing different languages.</p>
          </div>
          <div className='h-fit w-fit'>
            <PieChart />
          </div>
        </div>
        <Notes/>
      </div>
      <div className='flex flex-col w-[37%] h-[100vh] divide-y-4 divide-[#222831] bg-[#393E46]'>
        <WordOfTheDay />
        <Pitches />
      </div>
    </div>
  )
}

export default Page
