'use client'
import React from 'react'
import Sidebar from '../components/Sidebar'
import WordOfTheDay from '../components/WordOfTheDay'
import Pitches from '../components/Pitches'
import NoteCard from '../components/NoteCard'
import { Doughnut } from 'react-chartjs-2'
import { ArcElement, Chart } from 'chart.js'

const Page = () => {
  Chart.register(ArcElement);
  const words = [
    {
      word: "Quixotic",
      meaning: "Adjective: exceedingly idealistic; unrealistic and impractical.",
      use: "Despite the quixotic nature of his plan to build a sustainable city on Mars, he managed to gather a small but passionate group of supporters"
    },
    {
      word: "Quixotic",
      meaning: "Adjective: exceedingly idealistic; unrealistic and impractical.",
      use: "Despite the quixotic nature of his plan to build a sustainable city on Mars, he managed to gather a small but passionate group of supporters"
    },
    {
      word: "Quixotic",
      meaning: "Adjective: exceedingly idealistic; unrealistic and impractical.",
      use: "Despite the quixotic nature of his plan to build a sustainable city on Mars, he managed to gather a small but passionate group of supporters"
    },
    // {
    //   word: "Quixotic",
    //   meaning: "Adjective: exceedingly idealistic; unrealistic and impractical.",
    //   use: "Despite the quixotic nature of his plan to build a sustainable city on Mars, he managed to gather a small but passionate group of supporters"
    // }
  ]

  return (
    <div className='flex'>
      <Sidebar />
      <div className='w-[63%] divide-y-4 divide-[#393E46] overflow-y-auto'>
        <div className='w-full py-8 px-4 flex items-center justify-around'>
          <div className='flex flex-col w-6/12'>
            <h1 className='text-[#FFD369] text-3xl font-medium'>Your Language Usage</h1>
            <p className='text-[#EEEEEE]'>See how you've been spending your time practicing different languages.</p>
          </div>
          <div className='h-fit w-fit'>
            <Doughnut 
            data={{
              labels: [
                'Red',
                'Blue',
                'Yellow',
              ],
              datasets: [{
                label: 'My First Dataseteee',
                data: [300, 50, 100],
                backgroundColor: [
                  'rgb(255 211 105)',
                  'rgb(238, 238, 238)',
                  'rgb(57, 62, 70)',
                ],
                // hoverOffset: 4
              }]
            }} />
          </div>
        </div>
        <div className='w-full h-[50vh] py-2'>
          <h1 className='text-[#FFD369] text-3xl font-medium my-2  w-fit mx-auto'>Notes</h1>
          <div className='w-full px-4 grid grid-cols-3'>
            {words ? words.map((item) => {
              return <NoteCard item={item} />
            }) : null}
          </div>
        </div>
      </div>
      <div className='flex flex-col w-[25%] h-[100vh] divide-y-4 divide-[#222831] bg-[#393E46]'>
        <WordOfTheDay />
        <Pitches />
      </div>
    </div>
  )
}

export default Page
