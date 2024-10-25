import React from 'react'
import { signIn } from 'next-auth/react'

export default function page() {
  return (
    <div className='w-screen h-screen '>
<button onClick={() => signIn("google")}></button>
    </div>
  )
}
