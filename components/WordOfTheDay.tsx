import React, { useEffect, useState } from 'react'
import AddToNote from './AddToNote'

const get_word_of_the_day = async () => {
    const date = new Date()
    // console.log(date.getDate(), date.getMonth(), date.getFullYear())
    const wordofthedaykey = process.env.NEXT_PUBLIC_WORD_OF_THE_DAY_KEY
    try {
        const req = await fetch(`https://api.wordnik.com/v4/words.json/wordOfTheDay?date=${date.getDate()}%2F0${date.getMonth()+1}%2F${date.getFullYear()}&api_key=${wordofthedaykey}`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json'
            },
            cache: 'force-cache'
        })
        let res = await req.json()
        res['date'] = date.toLocaleDateString()
        return res
    } catch (error: any) {
        return error
    }
}

export default async function WordOfTheDay(){
    const word = await get_word_of_the_day()

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
                <AddToNote word={word}/>
            </div>}
        </div>
    )
}