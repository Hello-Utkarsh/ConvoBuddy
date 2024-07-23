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
import React from 'react'
import { MdOutlinePeopleAlt } from "react-icons/md";


const Pitches = () => {
    return (
        <div className='h-[43%] py-2 px-4'>
            <h1 className='bg-[#222831] text-center w-fit px-4 py-1 mx-auto rounded-xl tracking-tight text-[#FFD369]'>Top Pitches</h1>
            <div className='mt-3'>
                <AlertDialog>
                    <AlertDialogTrigger asChild>
                        <div className='w-full bg-[#222831] rounded-md text-[#EEEEEE] py-2 px-4 flex justify-between items-center hover:scale-105 transition duration-150 cursor-pointer my-2'>
                            <h2 className='text-[15px] w-4/6'>Unlocking Innovation: Collaborate and Create</h2>
                            <div className='flex items-center justify-between'>
                                <p className='w-fit'>500</p>
                                <MdOutlinePeopleAlt className='text-2xl ml-2' />
                            </div>
                        </div>
                    </AlertDialogTrigger>
                    <AlertDialogContent className="bg-[#222831]">
                        <AlertDialogHeader className="text-[#EEEEEE]">
                            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                            <AlertDialogDescription>
                                This action cannot be undone. This will permanently delete your
                                account and remove your data from our servers.
                            </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction>Join</AlertDialogAction>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialog>
                <AlertDialog>
                    <AlertDialogTrigger asChild>
                        <div className='w-full bg-[#222831] rounded-md text-[#EEEEEE] py-2 px-4 flex justify-between items-center hover:scale-105 transition duration-150 cursor-pointer my-2'>
                            <h2 className='text-[15px] w-4/6'>Unlocking Innovation: Collaborate and Create</h2>
                            <div className='flex items-center justify-between'>
                                <p className='w-fit'>500</p>
                                <MdOutlinePeopleAlt className='text-2xl ml-2' />
                            </div>
                        </div>
                    </AlertDialogTrigger>
                    <AlertDialogContent className="bg-[#222831]">
                        <AlertDialogHeader className="text-[#EEEEEE]">
                            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                            <AlertDialogDescription>
                                This action cannot be undone. This will permanently delete your
                                account and remove your data from our servers.
                            </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction>Join</AlertDialogAction>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialog>
                <AlertDialog>
                    <AlertDialogTrigger asChild>
                        <div className='w-full bg-[#222831] rounded-md text-[#EEEEEE] py-2 px-4 flex justify-between items-center hover:scale-105 transition duration-150 cursor-pointer my-2'>
                            <h2 className='text-[15px] w-4/6'>Unlocking Innovation: Collaborate and Create</h2>
                            <div className='flex items-center justify-between'>
                                <p className='w-fit'>500</p>
                                <MdOutlinePeopleAlt className='text-2xl ml-2' />
                            </div>
                        </div>
                    </AlertDialogTrigger>
                    <AlertDialogContent className="bg-[#222831]">
                        <AlertDialogHeader className="text-[#EEEEEE]">
                            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                            <AlertDialogDescription>
                                This action cannot be undone. This will permanently delete your
                                account and remove your data from our servers.
                            </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction>Join</AlertDialogAction>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialog>
            </div>
        </div>
    )
}

export default Pitches
