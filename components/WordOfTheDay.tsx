import React from 'react'

const WordOfTheDay = () => {
    return (
        <div className='h-2/4 py-3 px-4'>
            <div className='flex justify-between w-full items-center'>
                <h1 className='bg-[#222831 text-center text-lg font-medium w-fit rounded-lg tracking-tight text-[#FFD369]'>Word of the Day</h1>
                <p className='bg-[#222831] px-3 py-1 text-[#FFD369] text-sm tracking-tight rounded-xl'>24/04/2024</p>
            </div>
            <div className='mt-8 text-pretty text-[#EEEEEE] flex flex-col'>
                <h2 className='text-3xl font-medium'>Quixotic</h2>
                <p className='mt-2'>Adjective: exceedingly idealistic; unrealistic and impractical.</p>
                <p className='mt-2 text-sm'>&quot;Despite the quixotic nature of his plan to build a sustainable city on Mars, he managed to gather a small but passionate group of supporters&quot;</p>
                <button className='bg-[#222831] px-3 py-1 text-[#FFD369] tracking-tight rounded-lg mx-auto w-fit mt-4'>Add to Notes</button>
            </div>
        </div>
    )
}

export default WordOfTheDay
