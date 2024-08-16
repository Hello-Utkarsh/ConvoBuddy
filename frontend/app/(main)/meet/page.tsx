'use client'
import React, { useEffect, useRef, useState } from 'react'
import { Button } from "@/components/ui/button"
import { IoIosClose } from "react-icons/io";
import { v4 as uuidv4 } from 'uuid';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from "@/components/ui/command"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { Input } from "@/components/ui/input"
import { Check, ChevronsUpDown } from "lucide-react"
import { cn } from "@/lib/utils"
import { useUser } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';
import { Toaster } from '@/components/ui/toaster';
import { useToast } from '@/components/ui/use-toast';
import Image from 'next/image';

const frameworks = [
    {
        id: "1",
        value: "next.js",
        label: "Next.js",
    },
    {
        id: "2",
        value: "sveltekit",
        label: "SvelteKit",
    },
    {
        id: "3",
        value: "nuxt.js",
        label: "Nuxt.js",
    },
    {
        id: "4",
        value: "remix",
        label: "Remix",
    },
    {
        id: "5",
        value: "astro",
        label: "Astro",
    },
]

const Languages = [
    {
        id: "1",
        value: "english",
        label: "English",
    },
]

const Meet = () => {

    const { isSignedIn } = useUser()
    const router = useRouter()

    // control for muting audio and video
    const [audio, setAudio] = useState(false)
    const [video, setVideo]: any = useState(false)

    const [interestOpen, setInterestOpen] = useState(false)
    const [languageOpen, setLanguageOpen] = useState(false)
    const [sendingPc, setSendingPc]: any = useState()
    const [recevingPc, setRecevingPc]: any = useState()
    const [remoteMediaStream, setRemoteMediaStream] = useState()
    const remoteVideoRef = useRef<HTMLVideoElement>(null)
    let localVideoRef: any = useRef(null)
    // const localVideoRef.current: any = localVideoRef.current
    const { toast } = useToast()
    const [formData, setData]: any = useState({
        name: "",
        age: "",
        interests: [],
        languages: []
    })

    function handleSuccess(stream: any) {
        formData.userid = uuidv4()
        console.log(formData.userid, "your id")
        localVideoRef.current.srcObject = stream;
        const ws = new WebSocket('ws://localhost:8080')
        ws.onopen = () => {
            ws.send(JSON.stringify({ type: 'add-user', formData }))
            ws.onmessage = async (event: any) => {
                const message = JSON.parse(event.data)
                if (message.type == 'send-offer') {
                    const pc = new RTCPeerConnection()
                    setSendingPc(pc)
                    if (localVideoRef.current.srcObject.getAudioTracks()[0]) {
                        pc.addTrack(localVideoRef.current.srcObject.getAudioTracks()[0])
                    }
                    if (localVideoRef.current.srcObject.getVideoTracks()[0]) {
                        pc.addTrack(localVideoRef.current.srcObject.getVideoTracks()[0])
                    }

                    pc.onicecandidate = async (can: any) => {
                        if (can.candidate) {
                            ws.send(JSON.stringify({
                                type: 'add-ice-candidate',
                                roomId: message.roomId,
                                id: message.id,
                                candidate: can.candidate,
                                userType: 'sender'
                            }))
                        }
                    }

                    pc.onnegotiationneeded = async () => {
                        const sdp = await pc.createOffer();
                        pc.setLocalDescription(sdp)
                        ws.send(JSON.stringify({ type: 'offer', sdp: sdp, id: message.id, roomId: message.roomId }))
                    }
                }

                if (message.type == 'offer') {
                    const pc = new RTCPeerConnection();
                    console.log(message.sdp, "where everything is fine")
                    pc.setRemoteDescription(message.sdp)
                    const newSdp = await pc.createAnswer();
                    pc.setLocalDescription(newSdp)
                    const stream: any = new MediaStream()
                    if (remoteVideoRef.current) {
                        remoteVideoRef.current.srcObject = stream;
                    }
                    setRemoteMediaStream(stream)
                    setRecevingPc(pc)
                    pc.onicecandidate = async (can: any) => {
                        if (can.candidate) {
                            ws.send(JSON.stringify({
                                type: 'add-ice-candidate',
                                roomId: message.roomId,
                                id: message.id,
                                candidate: can.candidate,
                                userType: 'receiver'
                            }))
                        }
                    }
                    ws.send(JSON.stringify({ type: 'answer', roomId: message.roomId, sdp: newSdp, id: message.id }))
                    const track1 = pc.getTransceivers()[0].receiver.track
                    const track2 = pc.getTransceivers()[1].receiver.track

                    //@ts-ignore
                    remoteVideoRef.current.srcObject.addTrack(track1)
                    //@ts-ignore
                    remoteVideoRef.current.srcObject.addTrack(track2)
                    //@ts-ignore
                    remoteVideoRef.current.play();
                    console.log("reaching here")
                }

                if (message.type == 'answer') {
                    setSendingPc((pc: any) => {
                        if (pc.signalingState === "have-local-offer" || pc.signalingState === "have-remote-offer") {
                            pc.setRemoteDescription(message.sdp).catch(() => console.log(pc?.currentRemoteDescription))
                        }
                        return pc
                    })
                }

                if (message.type == 'add-ice-candidate') {
                    if (message.userType == 'sender') {

                        setRecevingPc((pc: RTCPeerConnection) => {
                            if (pc?.signalingState != 'closed') {
                                pc?.addIceCandidate(message.candidate)
                                return pc
                            }
                        })
                    } else {
                        setRecevingPc((pc: RTCPeerConnection) => {
                            if (!pc) {
                                console.error("sending pc nout found")
                            }
                            if (pc?.signalingState != 'closed') {
                                pc?.addIceCandidate(message.candidate)
                                return pc
                            }
                        })
                    }
                }
            }
        }
    }

    useEffect(() => {
        if (!isSignedIn) {
            router.push('/')
        }
        getPref()
    }, [])



    const handleChange = async (e: any) => {
        const name = e.target.name
        const value = e.target.value
        setData((p: any) => ({ ...p, [name]: value }))
    }


    const handleSubmit = async () => {
        console.log(formData)
        const savePref = await fetch('/api/prefrence', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: formData.name,
                age: formData.age,
                interests: formData.interests,
                languages: formData.languages
            })
        })
        const res = await savePref.json()
        if (res.message == 'success') {
            toast({
                description: "Added Successfully"
            })
        }
    }

    const getPref = async () => {
        const req = await fetch('/api/prefrence', {
            method: 'GET',
            headers: {
                'Content-Type': 'applictaion/json'
            }
        })
        const pref = await req.json()
        if (pref.message == 'success') {
            setData(pref.pref)
            return pref.pref
        }
    }

    const addLang = (e: any) => {
        console.log(e.target.value)
    }

    return (
        <div className='flex flex-col ml-[12%] px-16 py-4 w-full'>
            <div className='flex justify-between w-full'>
                <Dialog>
                    <DialogTrigger className='bg-[#393E46] hover:bg-black px-2 rounded-md text-[#FFD369] tracking-tight w-fit mt-4'>Edit Prefrence</DialogTrigger>
                    <DialogContent className='bg-[#393E46]'>
                        <DialogHeader>
                            <form className='flex flex-col' action={handleSubmit}>
                                <label className='text-white mt-1 ml-1' htmlFor="">Name</label>
                                <Input name='name' onChange={handleChange} value={formData.name} className='bg-[#222831] mt-1 text-white' type="text" placeholder="Joseph" />
                                <label className='text-white mt-2' htmlFor="">Age</label>
                                <Input value={formData.age} name='age' onChange={handleChange} className='bg-[#222831] mt-1 text-white' type="number" placeholder="18" />
                                <div className='flex justify-between'>
                                    <div>
                                        <Popover open={interestOpen} onOpenChange={setInterestOpen}>
                                            <PopoverTrigger asChild>
                                                <Button
                                                    variant="outline"
                                                    role="combobox"
                                                    aria-expanded={interestOpen}
                                                    className="w-fit mt-2 bg-[#222831] border-0 hover:bg-[#222831] hover:text-[#EEEEEE] text-[#EEEEEE] justify-between"
                                                >What are your interests
                                                    <ChevronsUpDown className="ml-2 h-4 w-fit shrink-0 opacity-50" />
                                                </Button>
                                            </PopoverTrigger>
                                            <PopoverContent className="w-[200px] p-0">
                                                <Command className='bg-[#222831] text-[#EEEEEE]'>
                                                    <CommandInput placeholder="Search framework..." />
                                                    <CommandEmpty>Not found.</CommandEmpty>
                                                    <CommandList>
                                                        <CommandGroup>
                                                            {frameworks.map((framework) => (
                                                                <CommandItem
                                                                    className='text-[#EEEEEE] pl-6'
                                                                    key={framework.id}
                                                                    value={framework.value}
                                                                    onSelect={(currentValue) => {
                                                                        const exist = formData['interests'].find((v: any) => currentValue == v)
                                                                        if (!exist) {
                                                                            setData((p: any) => ({ ...p, 'interests': [...formData['interests'], currentValue] }))
                                                                        }
                                                                        setInterestOpen(false)
                                                                    }}
                                                                >
                                                                    {framework.label}
                                                                </CommandItem>
                                                            ))}
                                                        </CommandGroup>
                                                    </CommandList>
                                                </Command>
                                            </PopoverContent>
                                        </Popover>
                                        <div className='flex flex-wrap mt-1'>
                                            {formData['interests'] && formData['interests'].map((val: any) => {
                                                return <span key={val} className='px-2 flex items-center py-1 bg-[#222831] text-[#EEEEEE] rounded-md mt-1 mx-1'>
                                                    <p className='-mt-1'>{val}</p> <span onClick={() => {
                                                        setData((p: any) => ({ ...p, 'interests': formData['interests'].filter((v: any) => v != val) }))
                                                    }} className='cursor-pointer'><IoIosClose /></span>
                                                </span>
                                            })}
                                        </div>
                                    </div>
                                    <div>
                                        <Popover open={languageOpen} onOpenChange={setLanguageOpen}>
                                            <PopoverTrigger asChild>
                                                <Button
                                                    variant="outline"
                                                    role="combobox"
                                                    aria-expanded={languageOpen}
                                                    className="w-fit mt-2 bg-[#222831] border-0 hover:bg-[#222831] hover:text-[#EEEEEE] text-[#EEEEEE] justify-between"
                                                >Select Language
                                                    <ChevronsUpDown className="ml-2 h-4 w-fit shrink-0 opacity-50" />
                                                </Button>
                                            </PopoverTrigger>
                                            <PopoverContent className="w-[200px] p-0">
                                                <Command className='bg-[#222831] text-[#EEEEEE]'>
                                                    <CommandInput placeholder="Search language..." onChangeCapture={addLang} />
                                                    <CommandEmpty className='px-1 py-1'>
                                                        <Button onClick={addLang} className='bg-[#EEEEEE] text-[#222831] hover:text-[#222831] hover:bg-[#EEEEEE] w-full font-normal rounded-sm h-fit'>Create language</Button>
                                                    </CommandEmpty>
                                                    <CommandList>
                                                        <CommandGroup>
                                                            {Languages.map((Language) => (
                                                                <CommandItem
                                                                    className='text-[#EEEEEE] pl-6'
                                                                    key={Language.id}
                                                                    value={Language.value}
                                                                    onSelect={(currentValue) => {
                                                                        const exist = formData['languages'].find((v: any) => currentValue == v)
                                                                        if (!exist) {
                                                                            setData((p: any) => ({ ...p, 'languages': [...formData['languages'], currentValue] }))
                                                                        }
                                                                        setLanguageOpen(false)
                                                                    }}
                                                                >
                                                                    {Language.label}
                                                                </CommandItem>
                                                            ))}
                                                        </CommandGroup>
                                                    </CommandList>
                                                </Command>
                                            </PopoverContent>
                                        </Popover>
                                        <div className='flex flex-wrap mt-1'>
                                            {formData['languages'] && formData['languages'].map((val: any) => { return <span key={val} className='px-2 flex items-center py-1 bg-[#222831] text-[#EEEEEE] rounded-md mx-1'><p className='-mt-1'>{val}</p> <span onClick={() => { setData((p: any) => ({ ...p, 'languages': formData['languages'].filter((v: any) => v != val) })) }} className='cursor-pointer'><IoIosClose /></span></span> })}
                                        </div>
                                    </div>
                                </div>
                                <Button type='submit' className='bg-[#222831] text-[#EEEEEE] tracking-tight w-fit mt-2'>Submit</Button>
                            </form>
                        </DialogHeader>
                    </DialogContent>
                </Dialog>
                {(sendingPc && recevingPc) ? <Button onClick={() => {
                    sendingPc.close()
                    setSendingPc(null)
                    recevingPc.close()
                    setRecevingPc(null)
                    localVideoRef.current.srcObject.getTracks().forEach((track: any) => {
                        track.stop()
                    })
                }} className='bg-[#393E46] text-[#FFD369] mt-4'>End</Button> : <Button onClick={() => {
                    window.navigator.mediaDevices.getUserMedia({
                        video: true,
                        audio: true
                    })
                        .then(handleSuccess)
                        .catch(err => { console.error('Error accessing media devices.', err) })
                }} className='bg-[#393E46] text-[#FFD369] mt-4'>Start</Button>}

            </div>
            <div>
                <div className='mt-8 relative w-10/12 mx-auto'>
                    <div className='bg-gray-400 h-[80vh] w-fit flex justify-center items-center mx-auto'>
                        <video className='h-full aspect-auto' ref={remoteVideoRef} id="localVideo" autoPlay />
                    </div>
                    <div className='bg-gray-100 h-fit absolute right-32 bottom-1 justify-center items-end flex flex-col'>
                        <video className='h-[25vh] aspect-auto' ref={localVideoRef} id="localVideo" autoPlay />
                        {localVideoRef.current?.srcObject && <div className='relative bottom-3 mx-auto flex'>
                            <span className='w-fit h-fit mx-2' onClick={() => {
                                localVideoRef.current.srcObject.getAudioTracks()[0].enabled = !localVideoRef.current.srcObject.getAudioTracks()[0].enabled
                                setAudio(!localVideoRef.current.srcObject.getAudioTracks()[0].enabled)
                            }}>
                                <Image width={500} height={500} alt='mic' className='w-11 rounded-full bg-slate-200 cursor-pointer px-3 py-3' src={'/mic.png'}></Image>
                                {audio && <div className='w-11 top-5 absolute h-[2px] -rotate-45 bg-black' />}
                            </span>
                            <span className='w-fit h-fit mx-2' onClick={() => {
                                localVideoRef.current.srcObject.getVideoTracks()[0].enabled = !localVideoRef.current.srcObject.getVideoTracks()[0].enabled
                                setVideo(!localVideoRef.current.srcObject.getVideoTracks()[0].enabled)
                            }}>
                                <Image width={500} height={500} alt='mic' className='w-11 rounded-full bg-slate-200 cursor-pointer px-3 py-3' src={'/camera.png'}></Image>
                                {video && <div className='w-11 top-5 absolute h-[2px] -rotate-45 bg-black' />}
                            </span>
                        </div>}
                    </div>
                </div>
            </div>
            <Toaster />
        </div>
    )
}

export default Meet
