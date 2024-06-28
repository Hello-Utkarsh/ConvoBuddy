'use client'
import { useClerk } from '@clerk/nextjs'
import { useRouter } from 'next/navigation'
import React from 'react'

const Sidebar = () => {

    const { signOut } = useClerk()
    const router = useRouter()

    return (
        <div className='w-[12%] h-[100vh] bg-[#393E46] flex flex-col item-center'>
            <div className='my-4 flex flex-col'>
                <button className=' hover:bg-[#222831] text-start pl-4 text-[#FFD369] py-2 rounded-sm my-2'>Profile</button>
                <button className=' hover:bg-[#222831] text-start pl-4 text-[#FFD369] py-2 rounded-sm my-2'>Meet</button>
                <button onClick={() => router.push('/pitches')} className=' hover:bg-[#222831] text-start pl-4 text-[#FFD369] py-2 rounded-sm my-2'>Pitches</button>
                <button onClick={() => router.push('/leaderboard')} className=' hover:bg-[#222831] text-start pl-4 text-[#FFD369] py-2 rounded-sm my-2'>Leaderboard</button>
                <button onClick={() => signOut({redirectUrl: '/'}) } className=' hover:bg-[#222831] text-start pl-4 text-[#FFD369] py-2 rounded-sm my-2'>Logout</button>
            </div>
        </div>
    )
}

export default Sidebar
