'use client'
import { Button } from './ui/button'
import { useSetRecoilState } from 'recoil'
import { useToast } from './ui/use-toast'
import { notes } from '@/app/states/atoms/atoms'
import { Toaster } from './ui/toaster'
import { addToNote } from '@/actions/useraction'

export default function AddToNote(props: any) {

    const word = props.word
    const { toast } = useToast()
    const setNote = useSetRecoilState(notes)

    return (
        <div className='flex justify-center'>
            <Button onClick={async () => {
                const res: any = await addToNote(word)
                if (res.message == "success") {
                    setNote((p): any => [...p, res.note])
                    toast({
                        description: "Added Successfully"
                    })
                } else {
                    toast({
                        description: res.message
                    })
                }
            }} className='bg-[#222831] text-[#FFD369] tracking-tight mx-auto w-fit mt-4'>Add to Notes</Button>
            <Toaster />
        </div>
    )
}