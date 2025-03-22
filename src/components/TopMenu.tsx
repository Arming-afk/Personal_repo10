import Image from "next/image";
import TopMenuItem from "./TopMenuItem";
import { getServerSession } from 'next-auth';
import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";
import { Link } from '@mui/material';

export default async function TopMenu() {

    const session = await getServerSession(authOptions)

    return (
        <div className='fixed top-0 left-0 right-0    
            h-[50px]
            flex flex-row justify-end
            bg-white
            border-t border-b border-gray-300
            z-30'>
            <TopMenuItem title='Menu Item Booking' pageRef='/booking'/>
            <Image src='/img/logo.png' 
            className='h-full w-auto' alt='logo'
            width={0} height={0} sizes='100vh' />
            <div className='flex flex-row absolute left-0 h-full'>
            {
                session? <Link href="/api/auth/signout">
                    <div className='flex items-center h-full px-10 text-black text-sm underline'> Sign-Out of {session.user?.name} </div></Link>
                : <Link href="/api/auth/signin">
                    <div className='flex items-center h-full px-10 text-black text-sm underline'>Sign-In</div>
                </Link>
            }
            <TopMenuItem title='My Booking' pageRef='/mybooking' />
            </div>
        </div>

    );
}