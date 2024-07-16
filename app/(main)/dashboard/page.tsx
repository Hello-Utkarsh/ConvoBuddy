'use client'
import React, { useEffect } from 'react'
import WordOfTheDay from '@/components/WordOfTheDay'
import Pitches from '@/components/Pitches'
import PieChart from '@/components/PieChart'
import { useRecoilState, useRecoilValue } from 'recoil'
import { notes } from '@/app/states/atoms/atoms'
import { MdDelete } from "react-icons/md";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"


const Page = () => {
  const [word, setWord]: any = useRecoilState(notes)

  useEffect(() => {
    get_notes()
  }, [])

  const get_notes = async () => {
    const req = await fetch('/api/notes', {
      method: 'GET'
    })
    const notes = await req.json()
    if (notes.message = 'success') {
      setWord(notes.req)
    }
  }

  const words = [
    {
      id: "1",
      word: "Quixotic",
      meaning: "Adjective: exceedingly idealistic; unrealistic and impractical.",
      use: "Despite the quixotic nature of his plan to build a sustainable city on Mars, he managed to gather a small but passionate group of supporters"
    }
  ]

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
        <div className='w-full h-[50vh] py-2'>
          <h1 className='text-[#FFD369] text-3xl font-medium my-2  w-fit mx-auto'>Notes</h1>
          <div className='w-full px-4 grid grid-cols-3'>
            {word ? word.map((item: any) => {
              return <Card className='bg-[#393E46] text-[#EEEEEE] border-none'>
                <CardHeader className='px-5 pb-3 flex flex-row justify-between'>
                  <div>
                    <CardTitle>{item.word}</CardTitle>
                    <CardDescription>{item.date}</CardDescription>
                  </div>
                  <MdDelete className='text-xl mr-4 h-fit'/>
                </CardHeader>
                <CardContent className='text-[15px] tracking-tighter px-5 pb-3'>
                  <p>{item.definition}</p>
                </CardContent>
                <CardFooter className='text-[15px] tracking-tighter px-5 pb-3'>
                  <p>{item.sentence}</p>
                </CardFooter>
              </Card>

            }) : null}
          </div>
        </div>
      </div>
      <div className='flex flex-col w-[37%] h-[100vh] divide-y-4 divide-[#222831] bg-[#393E46]'>
        <WordOfTheDay />
        <Pitches />
      </div>
    </div>
  )
}

export default Page
