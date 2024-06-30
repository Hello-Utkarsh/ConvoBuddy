'use client'
import { useClerk } from '@clerk/nextjs'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'

const Sidebar = () => {
    const [checked, setCheck] = useState('profile')

    const { signOut } = useClerk()
    const router = useRouter()

    return (
        <div className='w-[12%] h-[100vh] bg-[#393E46] flex flex-col item-center fixed'>
            <div className='my-4 flex flex-col'>
                <button aria-checked = {checked == 'profile' ? 'true' : 'false'} onClick={()=> {
                    setCheck("profile")
                    router.push('/dashboard')
                }} className='aria-checked:bg-[#222831] hover:bg-[#222831] text-start pl-4 text-[#FFD369] py-2 rounded-sm my-2'>Profile</button>
                <button aria-checked = {checked == 'meet' ? 'true' : 'false'} onClick={() => {
                    setCheck("meet")
                }} className='aria-checked:bg-[#222831] hover:bg-[#222831] text-start pl-4 text-[#FFD369] py-2 rounded-sm my-2'>Meet</button>
                <button aria-checked = {checked == 'pitches' ? 'true' : 'false'} onClick={() => {
                    setCheck("pitches")
                    router.push('/pitches')}} className='aria-checked:bg-[#222831] hover:bg-[#222831] text-start pl-4 text-[#FFD369] py-2 rounded-sm my-2'>Pitches</button>
                <button aria-checked = {checked == 'leaderboard' ? 'true' : 'false'} onClick={() => {
                    setCheck("leaderboard")
                    router.push('/leaderboard')}} className='aria-checked:bg-[#222831] hover:bg-[#222831] text-start pl-4 text-[#FFD369] py-2 rounded-sm my-2'>Leaderboard</button>
                <button aria-checked = {checked == 'logout' ? 'true' : 'false'} onClick={() => signOut({redirectUrl: '/'}) } className='aria-checked:bg-[#222831] hover:bg-[#222831] text-start pl-4 text-[#FFD369] py-2 rounded-sm my-2'>Logout</button>
            </div>
        </div>
    )
}

export default Sidebar
