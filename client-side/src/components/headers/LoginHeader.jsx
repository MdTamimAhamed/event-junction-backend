import React from 'react'
import { Link } from 'react-router-dom'

function LoginHeader() {
  return (
    <>
      <nav className='bg-primary p-6'>
          <div className="container mx-auto flex justify-between items-center">
            <div className=" text-white text-lg font-bold">DIU <span className='text-secondary font-bold' >Event</span> Junction</div>
              <div className="space-x-10 flex justify-between items-center text-white " >

                  <Link to='/home'><p className='border-b-[2px] border-secondary'>Home</p></Link>
                  <Link to='/about'><p className='hover:border-b-[2px] border-secondary'>About</p></Link>
                  <Link to='/contact'><p className='hover:border-b-[2px] border-secondary'>Contact</p></Link>

              </div>
          </div>
      </nav>
    </>
  )
}

export default LoginHeader