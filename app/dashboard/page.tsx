import React from 'react'
import Sidebar from '../components/Sidebar'
import WordOfTheDay from '../components/WordOfTheDay'
import Pitches from '../components/Pitches'
import NoteCard from '../components/NoteCard'

const Page = () => {
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
    {
      word: "Quixotic",
      meaning: "Adjective: exceedingly idealistic; unrealistic and impractical.",
      use: "Despite the quixotic nature of his plan to build a sustainable city on Mars, he managed to gather a small but passionate group of supporters"
    }
  ]

  return (
    <div className='flex'>
      <Sidebar />
      <div className='w-[63%] divide-y-4 divide-[#393E46] overflow-y-scroll'>
        <div className='w-full h-[50vh] py-2'>
          <h1 className='text-[#FFD369] text-2xl w-fit mx-auto'>Analytic Graph</h1>
        </div>
        <div className='w-full h-[50vh] py-2'>
          <h1 className='text-[#FFD369] text-3xl font-medium my-2  w-fit mx-auto'>Notes</h1>
          <div className='w-full px-4 grid grid-cols-3'>
            {words ? words.map((item) => {
              return <NoteCard item={item}/>
            }): null}
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
