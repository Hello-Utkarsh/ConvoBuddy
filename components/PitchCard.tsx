import React, { useEffect, useState } from 'react'
import { MdOutlinePeopleAlt } from 'react-icons/md'
import { Button } from "@/components/ui/button"
import { useUser } from '@clerk/nextjs'
import { enroll, unenroll } from '@/actions/useraction'

const PitchCard = (props: any) => {
    const [date, setDate] = useState('')
    const user: any = useUser()

    const delPitch = async(id: number, createdId: string) => {
        try {
            const req = await fetch('/api/pitches', {
                method: 'DELETE',
                body: JSON.stringify({
                    id: id,
                    createdId
                })
            })
            const res = await req.json()
            if (res.message != 'success') {
                return alert(res.message)
            }
        } catch (error: any) {
            console.log(error.message)
        }
    }

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
    })

    return (
        <div className='bg-[#393E46] rounded-lg flex flex-col justify-between px-4 py-2'>
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
                <div>
                    {props.isUser ? <Button onClick={()=>{delPitch(props.pitch.id, props.pitch.createdId)}} className='bg-[#222831] h-fit py-2 px-3 mr-2'>Delete</Button> : null}
                    {props.isRegistered ? <Button onClick={()=>{unenroll(props.registeredId)}} className='bg-[#222831] h-fit py-2 px-3'>Unenroll</Button> : <Button onClick={() => {enroll(props.pitch?.id)}} className='bg-[#222831] h-fit py-2 px-3'>Join</Button>}
                </div>
            </div>
        </div>
    )
}

export default PitchCard
