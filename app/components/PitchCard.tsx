import React from 'react'
import { MdOutlinePeopleAlt } from 'react-icons/md'

const PitchCard = () => {
    return (
        <div className='bg-[#393E46] rounded-lg flex flex-col px-4 py-2'>
            <div className='flex items-center justify-between my-1'>
                <h2 className='text-2xl text-[#EEEEEE] font-semibold'>Title</h2>
                <p className='text-[#EEEEEE] font-semibold text-sm tracking-tighter'>5/06/24 21:00 IST</p>
            </div>
            <p className='tracking-tighter text-[#EEEEEE]'>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Id incidunt impedit alias ex fugiat debitis, porro velit modi a aliquam.</p>
            <div className='flex justify-between my-1 mt-2'>
                <span className='flex items-center justify-center text-lg text-[#eeeeee]'>
                    <p className='mr-1'>500</p>
                    <MdOutlinePeopleAlt />
                </span>
                <button className='text-[#EEEEEE] bg-[#222831] px-3 py-1 rounded-md hover:scale-110 transition duration-150'>Join</button>
            </div>
        </div>
    )
}

export default PitchCard
