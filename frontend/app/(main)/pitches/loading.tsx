import React from 'react'

const loading = () => {
  return (
    <div className='animate-pulse flex ml-[13%] mt-6'>
      <div className='h-60 w-48 mx-2 rounded-md bg-[#393E46]'></div>
      <div className='h-60 w-48 mx-2 rounded-md bg-[#393E46]'></div>
      <div className='h-60 w-48 mx-2 rounded-md bg-[#393E46]'></div>
    </div>
  )
}

export default loading
