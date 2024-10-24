import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faThumbsUp } from '@fortawesome/free-regular-svg-icons'
import Image from 'next/image'


export default function Navbar() {
  return (
    <div className='w-screen h-auto flex justify-between items-center p-4'>
        <div>
            <Image src={"/logo.png"} width={40} height={40} alt='inventar logo'/>
        </div>
    </div>
  )
}
