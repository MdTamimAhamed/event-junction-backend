import React from 'react'

function EventHeroSection({pageName}) {
  return (
    <>
        <div className='bg-clientHeroImg h-[50vh] bg-no-repeat bg-cover bg-center'>
            <div className=' flex justify-center h-full w-full backdrop-blur-[120px]'>
                <div className='relative mt-[170px]'>
                    <h1 className='text-2xl font-medium text-center text-white'>{pageName || 'Page Name'}</h1>
                    <div className=' absolute left-[50%] top-[40px] translate-x-[-50%] h-1 w-14 bg-secondary'></div>
                </div>
            </div>
        </div>
    </>
  )
}

export default EventHeroSection