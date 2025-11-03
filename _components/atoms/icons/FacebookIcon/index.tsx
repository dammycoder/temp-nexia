import React from 'react'
import { cn } from '@/_lib/utils'

interface Props {
    className?: string
    size?: number
}
const FacebookIcon = ({ className }: Props) => {
    return (
        <svg className={cn('cursor-pointer text-nexia-dark-teal-100', className)} fill="currentColor" width="800px" height="800px" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" data-name="Layer 1"><path d="M20.9,2H3.1A1.1,1.1,0,0,0,2,3.1V20.9A1.1,1.1,0,0,0,3.1,22h9.58V14.25h-2.6v-3h2.6V9a3.64,3.64,0,0,1,3.88-4,20.26,20.26,0,0,1,2.33.12v2.7H17.3c-1.26,0-1.5.6-1.5,1.47v1.93h3l-.39,3H15.8V22h5.1A1.1,1.1,0,0,0,22,20.9V3.1A1.1,1.1,0,0,0,20.9,2Z" /></svg>
    )
}

export default FacebookIcon
