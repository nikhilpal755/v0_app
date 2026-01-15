import { onBoardUser } from '@/modules/auth/actions'
import Navbar from '@/modules/home/components/navbar';
import React from 'react'

export default async function layout({ children }: React.PropsWithChildren) {
    await onBoardUser();
    return (
        <main className='flex flex-col min-h-screen relative overflow-x-hidden'>
            {/* navbar */}
            <Navbar />
            <div className='fixed inset-0 -z-10 h-full w-full bg-background dark:bg-[radial-gradient(#393e4a_1px,transparent_1px)] bg-[radial-gradient(#dadde2_1px,transparent_1px)] [background-size: 16px_16px]'></div>
            <div className='flex-1 w-full'>
                {children}

            </div>
        </main>
    )
}
