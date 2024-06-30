'use client'
import React, { useState } from 'react'
import { MdOutlinePeopleAlt } from 'react-icons/md'

const LeaderBoard = () => {
  const [dropdown, setDropdown] = useState(false)
  const [createDialog, setDialog] = useState(false)

  return (
    <div className='flex flex-col p-2 w-[88%] ml-[12%]'>
      <div className='flex p-4 items-center justify-between'>
        <h1 className='text-3xl font-bold text-[#FFD369]'>Upcoming Pitch</h1>
        <div className='flex w-[350px] justify-between items-center mr-8'>
          <input className='rounded-lg px-2 w-48 py-1' type="text" />
          <div className='flex flex-col'>
            <button onClick={() => setDropdown(p => !p)} className='text-[#EEEEEE] px-3 py-1 border border-[#EEEEEE] rounded-lg hover:bg-[#393E46]'>Sort</button>
            <div className='flex-col aria-checked:flex hidden absolute mt-10 bg-[#EEEEEE] px-1 rounded-lg -ml-16 py-1' aria-checked={dropdown}>
              <p className='hover:bg-[#393E46] hover:text-[#EEEEEE] px-3 rounded-md'>Date</p>
              <p className='hover:bg-[#393E46] hover:text-[#EEEEEE] px-3 rounded-md'>Participants</p>
            </div>
          </div>
          <button onClick={() => setDialog(e => !e)} className='text-[#EEEEEE] px-3 py-1 border border-[#EEEEEE] rounded-lg hover:bg-[#393E46]'>New</button>
          <div aria-checked={createDialog} className='absolute hidden top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-fit min-w-[35vw] bg-[#393E46] aria-checked:flex flex-col text-[#eeeeee] border border-[#eeeeee] rounded-md py-4 px-4'>
            <div className='flex flex-col pb-2'>
              <label className='font-semibold mb-1' htmlFor="">Title</label>
              <input className='rounded-lg px-2 w-48 text-[#222831]' type="text" />
            </div>
            <div className='flex flex-col pb-2'>
              <label className='font-semibold mb-1' htmlFor="">Description</label>
              <textarea className='rounded-lg px-2 h-20 text-[#222831]' />
            </div>
            <div className='flex justify-between pb-2 w-4/6'>
              <span className='flex flex-col'>
                <label className='mb-1' htmlFor="">Date</label>
                <input className='rounded-lg px-1 text-[#222831]' type="date" />
              </span>
              <span className='flex flex-col'>
                <label className='mb-1' htmlFor="">Time</label>
                <input className='rounded-lg px-1 text-[#222831]' type="time" />
              </span>
            </div>
            <div className='flex justify-between w-full'>
              <button className='mt-4 bg-[#222831] px-3 py-1 rounded-md text-[#eeeeee] w-fit text-lg'>Submit</button>
              <button onClick={() => setDialog(false)} className='mt-4 bg-[#222831] px-3 py-1 rounded-md text-[#eeeeee] w-fit text-lg'>close</button>
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
