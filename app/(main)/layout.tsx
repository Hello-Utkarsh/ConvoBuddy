import React from 'react'
import Sidebar from '../components/Sidebar';

const layout = ({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) => {
  return (
    <div className='flex'>
      <Sidebar />
      {children}
    </div>
  )
}

export default layout
