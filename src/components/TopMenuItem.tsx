import Link from 'next/link';

export default function TopMenuItem({title, pageRef } : {title: string, pageRef: string}) {
    return (
        <Link href={pageRef} className='w-[150px] text-center mt-auto mb-auto font-sans text-[10pt] text-gray'>
            {title}
        </Link>
    );
}
