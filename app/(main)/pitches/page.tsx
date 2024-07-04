'use client'
import PitchCard from '@/app/components/PitchCard'
import { useUser } from '@clerk/nextjs'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { MdOutlinePeopleAlt } from 'react-icons/md'

const LeaderBoard = () => {
  const [dropdown, setDropdown] = useState(false)
  const [createDialog, setDialog] = useState(false)

  const { isSignedIn } = useUser()
  const router = useRouter()

  useEffect(() => {
    if (!isSignedIn) {
      router.push('/')
    }
  })

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm()

  const getPitches = async () => {
    const req = await fetch('/api/pitches', {
      method: 'GET'
    })
    const pitches = await req.json()
    console.log(pitches)
  }

  useEffect(() => {
    getPitches()
  })

  const onSubmit = (data: any) => {

  }

  return (
    <div className='flex flex-col p-2 w-[88%] ml-[12%]'>
      <div className='flex p-4 items-center justify-between'>

        <h1 className='text-3xl font-bold text-[#FFD369]'>Your Pitches</h1>
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

            <form onSubmit={handleSubmit(onSubmit)}>
              <div className='flex flex-col pb-2'>
                <label className='font-semibold mb-1' htmlFor="">Title</label>
                <input aria-invalid={errors.title ? "true" : "false"} {...register("title", { required: true })} className='rounded-lg px-2 w-48 text-[#222831]' type="text" />
                {errors.title?.type === "required" && (
                  <p role="alert" className='text-sm mt-1 text-red-400'>First name is required</p>
                )}
              </div>
              <div className='flex flex-col pb-2'>
                <label className='font-semibold mb-1' htmlFor="">Description</label>
                <textarea aria-invalid={errors.description ? "true" : "false"} {...register("description", { required: true })} className='rounded-lg px-2 h-20 text-[#222831]' />
                {errors.description?.type === "required" && (
                  <p role="alert" className='text-sm mt-1 text-red-400'>First name is required</p>
                )}
              </div>
              <div className='flex justify-between pb-2 w-9/12'>
                <span className='flex flex-col'>
                  <label className='mb-1' htmlFor="">Date</label>
                  <input aria-invalid={errors.date ? "true" : "false"} {...register("date", { required: true })} className='rounded-lg px-1 text-[#222831]' type="date" />
                  {errors.date?.type === "required" && (
                    <p role="alert" className='text-sm mt-1 text-red-400'>First name is required</p>
                  )}
                </span>
                <span className='flex flex-col'>
                  <label className='mb-1' htmlFor="">Time</label>
                  <input aria-invalid={errors.time ? "true" : "false"} {...register("time", { required: true })} className='rounded-lg px-1 text-[#222831]' type="time" />
                  {errors.time?.type === "required" && (
                    <p role="alert" className='text-sm mt-1 text-red-400'>First name is required</p>
                  )}
                </span>
              </div>
              <div className='flex justify-between w-full'>
                <input type="submit" className='mt-4 bg-[#222831] px-3 py-1 rounded-md text-[#eeeeee] w-fit text-lg' />
                <button onClick={() => setDialog(false)} className='mt-4 bg-[#222831] px-3 py-1 rounded-md text-[#eeeeee] w-fit text-lg'>close</button>
              </div>
            </form>

          </div>
        </div>
      </div>
      <div className='p-4 grid grid-cols-4 gap-4'>
        <PitchCard />
      </div>
      <div className='flex p-4 items-center justify-between'>
        <h1 className='text-3xl font-bold text-[#FFD369]'>Registerd Pitches</h1>
      </div>
      <div className='p-4 grid grid-cols-4 gap-4'>
        <PitchCard />
      </div>
      <div className='flex p-4 items-center justify-between'>
        <h1 className='text-3xl font-bold text-[#FFD369]'>All Pitches</h1>
      </div>
      <div className='p-4 grid grid-cols-4 gap-4'>
        <PitchCard />
      </div>
    </div >
  )
}

export default LeaderBoard
