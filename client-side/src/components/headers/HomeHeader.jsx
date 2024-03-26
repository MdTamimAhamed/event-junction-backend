import React ,{useEffect, useState}from 'react'
import {Link} from 'react-router-dom'
import {FiSearch} from 'react-icons/fi'
import {IoMdArrowDropdown} from 'react-icons/io'
import jwtDecode from 'jwt-decode'

function HomeHeader({user}) {

  const [bgClass, setBgClass] = useState('');
  const [active, setActive] = useState(false);
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setBgClass('bg-white');
      } else {
        setBgClass('');
      }
    };
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  function handleSetting(){
      if(!active){
        setActive(true)
      }else{
        setActive(false)
      }
  }

  function removeToken(name){
    if(name === 'logout'){
      localStorage.removeItem('user-token')
      window.location.href='/home'
    }
  }


  return (
    <>
        <nav className={`w-full fixed z-[9999] py-6 ${bgClass?'bg-white shadow-md': ''} transition-all ease-in`}>
          <div className='container px-24 flex flex-wrap justify-between mx-auto'>
            <div className={`${bgClass? 'text-black':'text-white'} text-lg font-bold`}>DIU <span className='text-secondary font-bold' >Event</span> Junction</div>
            <div className='flex flex-wrap'>
              <ul className={`flex flex-wrap items-center gap-x-12 ${bgClass? 'text-black':'text-white'} `}>
                <li>
                  <Link to="/"><span>Home</span></Link>
                </li>
                <li>
                  <Link to="#"><span>Events</span></Link>
                </li>
                <li>
                  <Link to="#"><span>Clubs</span></Link>
                </li>
                <li>
                  <Link to="#"><span>Gallery</span></Link>
                </li>
                <li>
                  <Link to="/about"><span>About</span></Link>
                </li>
                <li>
                  <Link to="#"><span>Contact</span></Link>
                </li>
                <FiSearch className='mr-24 ml-10'/>
              </ul>
              {user? 
                    (
                      <div onClick={handleSetting} className='relative cursor-pointer'>
                        <div className='flex'>
                          <div className='w-7 h-7 rounded-full flex justify-center items-center text-white bg-secondary'>{user}</div>
                          <IoMdArrowDropdown className={`${bgClass?'text-black': 'text-white'} text-md`}/>
                        </div>
                        <div className={`${active? 'block':'hidden'} absolute right-0 top-10 bg-white px-4 py-4 shadow-xl rounded-md`}>
                          <span className='absolute h-3 w-3 bg-white rotate-45 right-6 -top-1'></span>
                          <button>Settings</button>
                          <button onClick={()=>removeToken('logout')} className='text-red hover:font-medium'>Logout</button>
                        </div>
                      </div>
                    )
                    :(
                      <Link to="/login">
                        <button className=' bg-secondary text-white px-4 py-1 rounded'>Login</button>
                      </Link>
                    )}
            </div>
          </div>
        </nav>
    </>
  )
}

export default HomeHeader