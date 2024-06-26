import React from 'react'

const NoteCard = (props: any) => {
    
    return (
        <div className='bg-[#393E46] text-[#EEEEEE] w-fit h-fit rounded-md py-3 px-3 flex flex-col justify-center items-center text-center mx-2 my-2'>
            <h3 className='text-lg font-semibold'>{props.item.word}</h3>
            <p className='mt-2 tracking-tight text-[15px]'>{props.item.meaning}</p>
            <p className='mt-2 tracking-tight text-[15px]'>&quot;{props.item.use}&quot;</p>
        </div>
    )
}

export default NoteCard
