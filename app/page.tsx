import Image from "next/image";


export default function Home() {
  return (
    <div className="px-7">
      <header className="flex justify-between items-center text-[#FFD369] h-[7vh]">
        <h1 className="text-2xl font-medium tracking-tighter">ConvoBuddy</h1>
        <button className="bg-[#393E46] text-lg px-4 py-2 rounded-xl">Login</button>
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
      </main>
    </div >
  );
}
