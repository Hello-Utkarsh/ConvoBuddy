'use client'
import React, { useEffect, useState } from 'react'
import { Button } from './ui/button'
import { addToNote } from '@/actions/useraction'
import { useSetRecoilState } from 'recoil'
import { notes } from '@/app/states/atoms/atoms'
import { Toaster } from "@/components/ui/toaster"
import { useToast } from './ui/use-toast'

const WordOfTheDay = () => {
    const [word, setWord]: any = useState('')
    const [err, setError]: any = useState('')
    const { toast } = useToast()
    const setNote = useSetRecoilState(notes)
    const wordofthedaykey = process.env.NEXT_PUBLIC_WORD_OF_THE_DAY_KEY

    const get_word_of_the_day = async () => {
        const date = new Date().toLocaleDateString()
        try {
            const req = await fetch(`https://api.wordnik.com/v4/words.json/wordOfTheDay?date=14%2F07%2F2024&api_key=${wordofthedaykey}`, {
                method: 'GET',
                headers: {
                    'Accept': 'application/json'
                },
            })
            let res = await req.json()
            res['date'] = date
            setWord(res)
            console.log(res)
        } catch (error: any) {
            console.log(error)
        }
    }

    useEffect(() => {
        get_word_of_the_day()
    }, [])

    return (
        <div className='h-2/4 py-3 px-4'>
            <div className='flex justify-between w-full items-center'>
                <h1 className='bg-[#222831 text-center text-xl font-medium w-fit rounded-lg tracking-tight text-[#FFD369]'>Word of the Day</h1>
                <p className='bg-[#222831] px-3 py-1 text-[#FFD369] text-sm tracking-tight rounded-xl'>{word.date}</p>
            </div>
            {word.word && <div className='mt-2 text-pretty text-[#EEEEEE] flex flex-col'>
                <h2 className='text-xl font-medium'>{word.word}</h2>
                <p className='mt-2'>{word.definitions[0].partOfSpeech}</p>
                <p className='mt-1 text-sm'>&quot;{word?.examples[0].text}&quot;</p>
                <Button onClick={async () => {
                    const res: any = await addToNote(word)
                    if (res.message == "success") {
                        setNote((p): any => [...p, res.note])
                        toast({
                            description: "Added Successfully"
                        })
                    } else {
                        toast({
                            description: res.message
                        })
                    }
                }} className='bg-[#222831] text-[#FFD369] tracking-tight mx-auto w-fit mt-4'>Add to Notes</Button>
            </div>}
            <Toaster />
        </div>
    )
}

export default WordOfTheDay
