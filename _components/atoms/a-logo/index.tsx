import React from 'react'
import { cn } from '@/_lib/utils'
import Link from 'next/link'
import Image from 'next/image'


type Props ={
    className?: string
}

const Logo = ({className}: Props) => {
  return (
    <Link href="/" className={cn("flex items-center gap-2 p-0  cursor-pointer", className)}>
 <Image unoptimized={true} src='/assets/png/logo.png' alt="Logo" width={50} height={50} className=' w-[120px] lg:h-[100px] xl:h-[129.85px] lg:w-full object-contain' loading='lazy' />
    </Link>
  )
}

export default Logo