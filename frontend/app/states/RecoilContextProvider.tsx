'use client'
import { RecoilRoot } from 'recoil'

const MyApp = ({children}: any) => {
    return(
        <RecoilRoot>
            {children}
        </RecoilRoot>
    )
}

export default MyApp