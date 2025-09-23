import React from 'react'
import { cn } from '@/lib/utils'
import Link from 'next/link'
import Image from 'next/image'


type Props ={
    className?: string
}

const Logo = ({className}: Props) => {
  return (
    <Link href="/" className={cn("flex items-center gap-2 p-0 cursor-pointer", className)}>
        <Image src='/assets/png/svgviewer-png-output.png' alt="Logo" width={100} height={100} className=' w-[120px] lg:h-[100px] xl:h-[129.85px] lg:w-full object-contain' />
    </Link>
  )
}

export default Logo