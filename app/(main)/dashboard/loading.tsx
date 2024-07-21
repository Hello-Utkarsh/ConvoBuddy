import React from 'react'

const layout = () => {
  return (
    <div className='flex ml-[12%] animate-pulse justify-center'>
      <div className='flex-col'>
        <div className='ml-14 my-14 flex items-center'>
          <div className='flex-col items-center mr-40'>
            <div className='w-96 h-10 rounded-sm bg-[#393E46]'></div>
            <div className='w-80 h-6 rounded-sm bg-[#393E46] mt-2'></div>
          </div>
          <div className='rounded-full bg-[#393E46] w-60 h-60'></div>
        </div>
        <div className='flex ml-14'>
          <div className='h-60 w-48 mx-2 rounded-md bg-[#393E46]'></div>
          <div className='h-60 w-48 mx-2 rounded-md bg-[#393E46]'></div>
          <div className='h-60 w-48 mx-2 rounded-md bg-[#393E46]'></div>
          <div className='h-60 w-48 mx-2 rounded-md bg-[#393E46]'></div>
        </div>
      </div>
      <div className='flex flex-col ml-6'>
        <div className='flex flex-col mb-20 mt-8'>
          <div className='h-12 w-64 mx-2 mt-4 rounded-md bg-[#393E46]'></div>
          <div className='h-12 w-64 mx-2 mt-4 rounded-md bg-[#393E46]'></div>
          <div className='h-12 w-64 mx-2 mt-4 rounded-md bg-[#393E46]'></div>
        </div>
        <div className='h-72 w-64 mx-2 rounded-md bg-[#393E46]'></div>
      </div>
    </div>
  )
}

export default layout
