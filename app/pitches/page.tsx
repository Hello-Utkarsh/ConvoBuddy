import React from 'react'
import { MdOutlinePeopleAlt } from 'react-icons/md'

const LeaderBoard = () => {
  return (
    <div className='flex flex-col p-2'>
      <div className='flex p-4 items-center justify-between'>
        <h1 className='text-3xl font-bold text-[#FFD369]'>Upcoming Pitch</h1>
        <div className='flex w-[264px] justify-between items-center mr-8'>
          <input className='rounded-lg px-2 w-48 py-1' type="text" />
          <div className='flex flex-col'>
            <p className='text-[#EEEEEE] px-3 py-1 border border-[#EEEEEE] rounded-lg hover:bg-[#393E46]'>Sort</p>
            <div className='flex-col aria-checked:flex hidden absolute mt-10 bg-[#EEEEEE] px-1 rounded-md -ml-16 py-1' aria-checked='false'>
              <p className='hover:bg-[#393E46] hover:text-[#EEEEEE] px-3 rounded-md'>Date</p>
              <p className='hover:bg-[#393E46] hover:text-[#EEEEEE] px-3 rounded-md'>Participants</p>
            </div>
          </div>
        </div>
      </div>
      <div className='p-4 grid grid-cols-4 gap-4'>
        <div className='bg-[#393E46] rounded-lg flex flex-col px-4 py-2'>
          <h2 className='text-2xl text-[#EEEEEE] font-semibold'>Title</h2>
          <p className='tracking-tighter text-[#EEEEEE]'>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Id incidunt impedit alias ex fugiat debitis, porro velit modi a aliquam.</p>
          <div className='flex justify-between my-1 mt-2'>
            <span className='flex items-center justify-center text-lg text-[#eeeeee]'>
              <p className='mr-1'>500</p>
              <MdOutlinePeopleAlt />
            </span>
            <button className='text-[#EEEEEE] bg-[#222831] px-3 py-1 rounded-md hover:scale-110 transition duration-150'>Join</button>
          </div>
        </div>
        <div className='bg-[#393E46] rounded-lg flex flex-col px-4 py-2'>
          <h2 className='text-2xl text-[#EEEEEE] font-semibold'>Title</h2>
          <p className='tracking-tighter text-[#EEEEEE]'>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Id incidunt impedit alias ex fugiat debitis, porro velit modi a aliquam.</p>
          <div className='flex justify-between my-1 mt-2'>
            <span className='flex items-center justify-center text-lg text-[#eeeeee]'>
              <p className='mr-1'>500</p>
              <MdOutlinePeopleAlt />
            </span>
            <button className='text-[#EEEEEE] bg-[#222831] px-3 py-1 rounded-md hover:scale-110 transition duration-150'>Join</button>
          </div>
        </div>
        <div className='bg-[#393E46] rounded-lg flex flex-col px-4 py-2'>
          <h2 className='text-2xl text-[#EEEEEE] font-semibold'>Title</h2>
          <p className='tracking-tighter text-[#EEEEEE]'>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Id incidunt impedit alias ex fugiat debitis, porro velit modi a aliquam.</p>
          <div className='flex justify-between my-1 mt-2'>
            <span className='flex items-center justify-center text-lg text-[#eeeeee]'>
              <p className='mr-1'>500</p>
              <MdOutlinePeopleAlt />
            </span>
            <button className='text-[#EEEEEE] bg-[#222831] px-3 py-1 rounded-md hover:scale-110 transition duration-150'>Join</button>
          </div>
        </div>
        <div className='bg-[#393E46] rounded-lg flex flex-col px-4 py-2'>
          <h2 className='text-2xl text-[#EEEEEE] font-semibold'>Title</h2>
          <p className='tracking-tighter text-[#EEEEEE]'>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Id incidunt impedit alias ex fugiat debitis, porro velit modi a aliquam.</p>
          <div className='flex justify-between my-1 mt-2'>
            <span className='flex items-center justify-center text-lg text-[#eeeeee]'>
              <p className='mr-1'>500</p>
              <MdOutlinePeopleAlt />
            </span>
            <button className='text-[#EEEEEE] bg-[#222831] px-3 py-1 rounded-md hover:scale-110 transition duration-150'>Join</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LeaderBoard
