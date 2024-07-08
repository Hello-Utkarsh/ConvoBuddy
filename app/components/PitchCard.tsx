import React, { useEffect, useState } from 'react'
import { MdOutlinePeopleAlt } from 'react-icons/md'

const PitchCard = (props: any) => {
    const [date, setDate] = useState('')

    useEffect(() => {
        if (props.pitch?.startDate) {
            const utcDate = new Date(props.pitch.startDate);

            const istOffset = 5.5 * 60;
            const istDate = new Date(utcDate.getTime() + istOffset * 60 * 1000);

            const formattedDate = istDate.toLocaleString('en-IN', {
                timeZone: 'Asia/Kolkata',
                year: 'numeric',
                month: '2-digit',
                day: '2-digit',
                hour: '2-digit',
                minute: '2-digit',
            });
            setDate(formattedDate)
        }

    }, [])

    return (
        <div className='bg-[#393E46] rounded-lg flex flex-col h-fit px-4 py-2'>
            <div className='flex items-center justify-between my-1'>
                <h2 className='text-xl tracking-tighter w-7/12 text-[#EEEEEE] font-semibold'>{props.pitch?.title}</h2>
                <p className='text-[#EEEEEE] font-semibold text-sm tracking-tighter w-4/12'>{date}</p>
            </div>
            <p className='tracking-tighter text-[#EEEEEE]'>{props.pitch?.description}</p>
            <div className='flex justify-between my-1 mt-2'>
                <span className='flex items-center justify-center text-lg text-[#eeeeee]'>
                    <p className='mr-1'>{props.pitch?.registered}</p>
                    <MdOutlinePeopleAlt />
                </span>
                <button className='text-[#EEEEEE] bg-[#222831] px-3 py-1 rounded-md hover:scale-110 transition duration-150'>Join</button>
            </div>
        </div>
    )
}

export default PitchCard
