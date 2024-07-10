import React from 'react'
import Sidebar from '@/components/Sidebar';
import RecoilContextProvider from '@/app/states/RecoilContextProvider'

const layout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <div className='flex'>
      <Sidebar />
      <RecoilContextProvider>
        {children}
      </RecoilContextProvider>
    </div>
  )
}

export default layout
