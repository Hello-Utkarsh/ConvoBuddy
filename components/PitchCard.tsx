import React, { useEffect, useState } from 'react'
import { MdOutlinePeopleAlt } from 'react-icons/md'
import { Button } from "@/components/ui/button"
import { enroll, unenroll } from '@/actions/useraction'
import { useRecoilState } from 'recoil'
import { pitch, registered_picth, user_pitch, } from '@/app/states/atoms/atoms'
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import {
    Alert,
    AlertDescription,
    AlertTitle,
} from "@/components/ui/alert"


const PitchCard = (props: any) => {
    const [date, setDate] = useState('')
    const [error, setError] = useState('')
    const [pitches, setPitches] = useRecoilState(pitch)
    const [userpitch, setUserPitch] = useRecoilState(user_pitch)
    const [registeredpitch, setRegisteredPitch] = useRecoilState(registered_picth)

    const delPitch = async (id: number, createdId: string) => {
        try {
            const req = await fetch('/api/pitches', {
                method: 'DELETE',
                body: JSON.stringify({
                    id: id,
                    createdId
                })
            })
            const res = await req.json()
            if (res.message == 'success') {
                setPitches(pitches.filter((pitch: any) => pitch.id !== id))
                setUserPitch(userpitch.filter((pitch: any) => pitch.id !== id))
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
                    {props.isUser ?
                        <AlertDialog>
                            <AlertDialogTrigger><Button className='bg-[#222831] h-fit text-sm py-2 px-3 mr-2'>Delete</Button></AlertDialogTrigger>
                            <AlertDialogContent className='bg-[#222831] text-[#EEEEEE] border-0'>
                                <AlertDialogHeader>
                                    <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                                    <AlertDialogDescription>
                                        This action cannot be undone. This will permanently delete your pitch.
                                    </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                    <AlertDialogCancel className='text-[#222831]'>Cancel</AlertDialogCancel>
                                    <AlertDialogAction onClick={() => { delPitch(props.pitch.id, props.pitch.createdId) }}>Continue</AlertDialogAction>
                                </AlertDialogFooter>
                            </AlertDialogContent>
                        </AlertDialog>
                        : null}
                    {props.isRegistered ? <Button onClick={async () => {

                        const res: any = await unenroll()
                        setRegisteredPitch(registeredpitch.filter((registered_pitch: any) => registered_pitch.id !== res.id))

                    }} className='bg-[#222831] h-fit py-2 px-3 text-sm'>Unenroll</Button> : <Button onClick={async () => {

                        const res: any = await enroll(props.pitch?.id)
                        if (res.error) {
                            return setError(res.error)
                        }
                        setRegisteredPitch((p): any => [...p, res])

                    }} className='bg-[#222831] h-fit py-2 px-3 text-sm'>Join</Button>}
                </div>
            </div>
            {error &&
                <Alert>
                    <AlertTitle className='flex justify-between items-center'>
                        <p>Oops!</p>
                        <p className='text-base cursor-pointer' onClick={() => setError('')}>x</p>
                    </AlertTitle>
                    <AlertDescription>
                        {error}
                    </AlertDescription>
                </Alert>
            }
        </div>
    )
}

export default PitchCard