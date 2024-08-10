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
    const [interestOpen, setInterestOpen] = useState(false)
    const [languageOpen, setLanguageOpen] = useState(false)
    const [video, setVideo]: any = useState(false)
    const [sendingPc, setSendingPc] = useState()
    const [recevingPc, setRecevingPc] = useState()
    const [remateVideoTrack, setRemoteVideoTrack] = useState()
    const [remoteMediaStream, setRemoteMediaStream] = useState()
    const [remoteAuidoTrack, setRemoteAuidoTrack] = useState()
    const remoteVideoRef = useRef(null)
    let localVideoRef = useRef(null)
    const videoElement: any = remoteVideoRef.current
    const { toast } = useToast()
    const [formData, setData]: any = useState({
        name: "",
        age: "",
        interests: [],
        languages: []
    })

    function handleSuccess(stream: any) {
        formData.userid = uuidv4()
        videoElement.srcObject = stream;
        const ws = new WebSocket('ws://localhost:8080')
        ws.onopen = () => {
            ws.send(JSON.stringify({ type: 'add-user', formData }))
            ws.onmessage = async (event: any) => {
                const message = JSON.parse(event.data)
                if (message.type == 'send-offer') {
                    const pc = new RTCPeerConnection()
                    setSendingPc(pc)
                    pc.addTrack(videoElement.srcObject.getAudioTracks()[0])
                    pc.addTrack(videoElement.srcObject.getVideoTracks()[0])

                    pc.onicecandidate = async (can: any) => {
                        if (can.candidate) {
                            ws.send(JSON.stringify({
                                type: 'add-ice-candidate',
                                candidate: can.candidate,
                                userType: 'sender'
                            }))
                            pc.addIceCandidate(can.candidate)
                        }
                    }

                    pc.onnegotiationneeded = async () => {
                        const sdp = await pc.createOffer()
                        pc.setLocalDescription(sdp)
                        ws.send(JSON.stringify({ type: 'offer', sdp: sdp, roomId: message.roomId }))
                    }
                    console.log("object")
                }

                if (message.type == 'offer') {
                    const pc: RTCPeerConnection = new RTCPeerConnection()
                    pc.setRemoteDescription(message.sdp)
                    const sdp = await pc.createAnswer()
                    console.log(sdp, "answer sdp")
                    pc.setLocalDescription(sdp)
                    const stream: any = new MediaStream()
                    if (videoElement) {
                        videoElement.srcObject = stream

                    }

                    setRemoteMediaStream(stream)
                    setRecevingPc(pc)
                    pc.onicecandidate = async (can: any) => {
                        if (can.candidate) {
                            console.log("inside offer inside onicecandidate", can.candidate)
                            ws.send(JSON.stringify({
                                type: 'add-ice-candidate',
                                roomId: message.roomId,
                                id: message.id,
                                candidate: can.candidate,
                                userType: 'receiver'
                            }))
                            pc.addIceCandidate(can.candidate)
                        }
                    }
                    
                    pc.ontrack = (({ track, type }: any) => {
                        if (type == 'auido') {
                            //@ts-ignore
                            videoElement.srcObject.addTrack(track)
                        } else {
                            videoElement.srcObject.addTrack(track)
                        }
                        //@ts-ignore
                        remoteVideoRef.current.play()
                    })
                    console.log(sdp)
                    ws.send(JSON.stringify({ type: 'answer', roomId: message.roomId, sdp: sdp, id: message.id }))
                    console.log('successfully sent answer req')
                }

                if (message.type == 'answer') {
                    console.log(message.sdp, "inside answer sdp")
                    setSendingPc((pc: RTCPeerConnection) => {
                        pc.setRemoteDescription(message.sdp)
                        return pc
                    })
                }

                if (message.type == 'add-ice-candidate') {
                    console.log("inside add-ice-candidate")
                    if (message.userType == 'sender') {
                        console.log("add-ice-candidate")
                        console.log(message.candidate, "message candidate")
                        setRecevingPc(pc => {
                            pc?.addIceCandidate(message.candidate)
                            return pc
                        })
                        console.log("crossed it!")
                    } else {
                        console.log("add-ice-candidate2")
                        setRecevingPc(pc => {
                            pc?.addIceCandidate(message.candidate)
                            return pc
                        })
                        console.log("crossed it2!")
                    }
                }
            }
        }


    }

    function handleError(error: any) {
        console.error('Error accessing media devices.', error);
    }

    useEffect(() => {
        if (!isSignedIn) {
            router.push('/')
        }
        getPref()
        // if (localVideoRef.current) {
        //     localVideoRef.current.srcObject = new MediaStream([local])
        // }
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
                {!video ? <Button onClick={() => {
                    window.navigator.mediaDevices.getUserMedia({
                        video: true,
                        audio: true
                    })
                        .then(handleSuccess)
                        .catch(handleError)
                }} className='bg-[#393E46] text-[#FFD369] mt-4'>Start</Button> :
                    <div className='flex'>
                        <Button onClick={() => {
                            const videoElement: any = vidcomp.current
                            const stream = videoElement.srcObject;
                            const tracks = stream.getTracks();
                            tracks.forEach((track: any) => {
                                track.stop();
                                setVideo(false)
                            });
                        }} className='bg-[#393E46] text-[#FFD369] mt-4 mx-2'>End</Button>
                        <Button className='bg-[#393E46] text-[#FFD369] mt-4 mx-2'>Next</Button>
                    </div>
                }
            </div>
            <div>
                <div className='mt-8 relative w-10/12 mx-auto'>
                    <div className='bg-gray-400 h-[80vh] flex justify-center items-center'>Recevers Video</div>
                    <div className='bg-gray-100 h-fit absolute right-8 bottom-2 justify-center items-center flex'>
                        <video className='h-[25vh] aspect-auto' ref={remoteVideoRef} id="localVideo" autoPlay />
                    </div>
                </div>
            </div>
            <Toaster />
        </div>
    )
}

export default Meet
