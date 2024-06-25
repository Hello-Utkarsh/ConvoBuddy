'use client'
import {
  SignInButton,
  SignedIn,
  SignedOut,
  UserButton,
  useUser
} from '@clerk/nextjs'
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';


export default function Home() {
  const { isSignedIn } = useUser()
  const router = useRouter()
  useEffect(() => {
    if (isSignedIn) {
      router.push('/dashboard')
    }
  })
  return (
    <div className="px-7">
      <header className="flex justify-between items-center text-[#FFD369] h-[7vh]">
        <h1 className="text-2xl font-medium tracking-tighter">ConvoBuddy</h1>
        <div className="text-lg px-3 py-1 rounded-xl">
          <SignedOut>
            <SignInButton />
          </SignedOut>
          <SignedIn>
            <UserButton />
          </SignedIn>
        </div>
      </header>
      <main>
        <section className="text-[#FFD369] flex items-center justify-between h-[93vh]">
          <div className="flex flex-col w-[45%]">
            <h1 className="text-[55px] leading-none text-pretty font-['Manrope'] tracking-tighter font-semibold">Platform To Enhance Your Communictaion Skills</h1>
            <h3 className="text-[#EEEEEE] text-[22px] leading-tight my-4 ">Connect with random individuals who are<br />learning the same language and practice through<br />real conversation</h3>
          </div>
          <img className="aspect-auto w-[52%]" src="vc_pic.jpg" alt="" />
        </section>
        <section className="bg-[#393E46] flex flex-col py-8">
          <p className="text-[#222831] bg-[#FFD369] rounded-lg mx-auto px-3 py-1 w-fit">Key Feature</p>
          <h1 className="mx-auto text-[#FFD369] text-5xl font-semibold tracking-tight mt-4">Enhance Your Communication</h1>
          <p className="mx-auto text-[#EEEEEE] mt-2 text-lg tracking-tight">ConvoBuddy offers a lot of feature to improve your communication skills as well as increase your vocabulary</p>
          <div className="flex flex-wrap justify-around mt-8 w-[85%] mx-auto">
            <div className="bg-[#222831] w-[24%] rounded-lg text-center h-fit py-5 px-3">
              <h5 className="text-[#FFD369] mx-auto text-lg tracking-tight font-medium">One on One Convos</h5>
              <p className="text-[#EEEEEE] mx-auto text-pretty mt-1">Connect with random individuals who are learning the same language and practice through real conversation</p>
            </div>
            <div className="bg-[#222831] w-[22%] rounded-lg text-center h-fit py-4 px-3">
              <h5 className="text-[#FFD369] mx-auto text-lg tracking-tight font-medium">Word of the Days</h5>
              <p className="text-[#EEEEEE] mx-auto text-pretty mt-1">Learn new words everyday. Keep the difficult ones always in front of your eyes using our notes</p>
            </div>
            <div className="bg-[#222831] w-[22%] rounded-lg text-center h-fit py-4 px-3">
              <h5 className="text-[#FFD369] mx-auto text-lg tracking-tight font-medium">Pitches</h5>
              <p className="text-[#EEEEEE] mx-auto text-pretty mt-1">Having a presentation? Practice it before hand, with the poeple interested in your idea</p>
            </div>
            <div className="bg-[#222831] w-[20%] rounded-lg text-center h-fit py-4 px-3">
              <h5 className="text-[#FFD369] mx-auto text-lg tracking-tight font-medium">Daily Analysis</h5>
              <p className="text-[#EEEEEE] mx-auto text-pretty mt-1">Get complete anaylysis of how many hours you spent in practicing each language</p>
            </div>
          </div>
        </section>
        <footer className='flex justify-between items-center px-8 py-8 mt-16'>
          <div className='flex flex-col w-3/6'>
            <div className='flex flex-col'>
              <h1 className='text-[#FFD369] text-[55px] font-semibold my-1 tracking-tighter leading-none'>Take your communication skills to the next level</h1>
              <p className='text-[#EEEEEE] text-[22px] my-1'>ConvoBuddy empowers you with tools to make your virtual meetings more effective.</p>
            </div>
            <div className="px-4 py-2 w-fit rounded-xl text-[#FFD369] bg-[#393E46]">
              <SignedOut>
                <SignInButton />
              </SignedOut>
              <SignedIn>
                <UserButton />
              </SignedIn>
            </div>
          </div>
          <div className='w-2/6 bg-[#393E46]  justify-center mr-10 rounded-xl py-4 flex flex-col'>
            <h1 className='text-[#FFD369] text-2xl font-semibold my-2 w-4/6 mx-auto'>Contact us</h1>
            <div className='flex flex-col mx-auto w-4/6'>
              <div className='flex flex-col my-2'>
                <label className='text-[#EEEEEE]' htmlFor="">Name</label>
                <input className='rounded-xl text-[#EEEEEE] bg-[#393E46] border-[#EEEEEE] border-2 px-3 mt-1' type="text" />
              </div>
              <div className='flex flex-col my-2'>
                <label className='text-[#EEEEEE]' htmlFor="">Email</label>
                <input className='rounded-xl text-[#EEEEEE] bg-[#393E46] border-[#EEEEEE] border-2 px-3 mt-1' type="text" />
              </div>
              <div className='flex flex-col my-2'>
                <label className='text-[#EEEEEE]' htmlFor="">Message</label>
                <textarea className='rounded-xl text-[#EEEEEE] bg-[#393E46] border-[#EEEEEE] border-2 px-3 mt-1' name="" id=""></textarea>
              </div>
              <button className='bg-[#222831] px-4 py-2 rounded-xl text-[#FFD369] w-fit mt-2 ml-[66%]'>Submit</button>
            </div>
          </div>
        </footer>
      </main>
    </div >
  );
}
