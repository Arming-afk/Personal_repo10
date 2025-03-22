import Image from 'next/image';
import InteractiveCard from './InteractiveCard';
import Rating from '@mui/material/Rating';
import Stack from '@mui/material/Stack';


export default function Card( { venueName, imgSrc, onCompare} : {venueName:string, imgSrc:string, onCompare?:Function}) {
    return (
        <InteractiveCard contentName={venueName}>
            <div className='w-full h-[70%] relative rounded-t-lg'>
                <Image src={imgSrc}
                alt='Product Picture'
                fill={true}
                className='object-cover rounded-t-lg'/>
            </div>
            <div className='w-full h-[15%] p-[10px]'>
                {venueName}
            </div>
            {
                onCompare? <div className='w-full h-[10%] px-[10px]' onClick={(e) => e.stopPropagation()}>
                <Rating id={venueName+" Rating"} name={venueName+" Rating"} 
                data-testid={venueName+" Rating"} defaultValue={0} precision={0.5} 
                onChange={ (e,newRating)=>{onCompare(venueName,newRating)} }
                /></div> : ''
            }
            
        </InteractiveCard>
    )
}