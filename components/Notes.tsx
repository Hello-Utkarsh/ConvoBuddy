"use client"
import { notes } from '@/app/states/atoms/atoms'
import React, { useCallback, useEffect } from 'react'
import { useRecoilState } from 'recoil'
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { delete_note } from '@/actions/useraction'
import { useToast } from '@/components/ui/use-toast'
import { Toaster } from '@/components/ui/toaster'
import { MdDelete } from "react-icons/md";

const Notes = () => {
    const {toast} = useToast()
    const [word, setWord]: any = useRecoilState(notes)

    const get_notes = async () => {
        const req = await fetch('/api/notes', {
            method: 'GET'
        })
        const notes = await req.json()
        if (notes.message = 'success') {
            setWord(notes.req)
        }
    }

    useEffect(() => {
        get_notes()
    }, [])

    return (
        <div className='w-full min-h-[57%] py-2'>
            <h1 className='text-[#FFD369] text-3xl font-medium my-2  w-fit mx-auto'>Notes</h1>
            <div className='w-full px-4 grid grid-cols-3'>
                {word ? word.map((item: any) => {
                    return <Card className='bg-[#393E46] text-[#EEEEEE] border-none' key={item.id}>
                        <CardHeader className='px-5 pb-3 flex flex-row justify-between'>
                            <div>
                                <CardTitle>{item.word}</CardTitle>
                                <CardDescription>{item.date}</CardDescription>
                            </div>
                            <MdDelete onClick={async () => {
                                const res = await delete_note(item.id)
                                if (res.message == 'success') {
                                    setWord(word.filter((p: any) => p.id != res.delete_note.id))
                                    toast({
                                        description: "Deleted Successfully"
                                    })
                                } else {
                                    toast({
                                        description: res.message
                                    })
                                }
                            }} className='text-xl mr-4 h-fit cursor-pointer' />
                        </CardHeader>
                        <CardContent className='text-[15px] tracking-tighter px-5 pb-3'>
                            <p>{item.definition}</p>
                        </CardContent>
                        <CardFooter className='text-[15px] tracking-tighter px-5 pb-3'>
                            <p>{item.sentence}</p>
                        </CardFooter>
                    </Card>
                }) : null}
                <Toaster />
            </div>
        </div>
    )
}

export default Notes
