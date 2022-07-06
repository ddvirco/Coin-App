import { useState } from "react"
import { NavLink, useNavigate } from "react-router-dom"
import ThemeToggle from "./ThemeToggle"
import { AiOutlineMenu, AiOutlineClose } from 'react-icons/ai'
import { UserAuth } from '../context/AuthContext'

function Navbar() {

    const [nav, setNav] = useState(false)

    const { user, logOut } = UserAuth();
    const navigate = useNavigate();
    const changeNav = () => {
        setNav(!nav)
    }

    const handleSignOut = async () => {
        try {
            await logOut()
            navigate('/')
        }
        catch (e) {
            console.log(e.message)
        }
    }

    return (
        <div className="rounded-div flex items-center justify-between h-20 font-bold">
            <NavLink to='/'>
                <h1 className="text-2xl"> Cryptobase</h1>
            </NavLink>
            <div className='hidden md:block'>
                <ThemeToggle />
            </div>
            {user?.email ?
                (
                    <div>
                        <NavLink to='/account' className='p-4'>Account</NavLink>
                        <button onClick={handleSignOut}>Sign out</button>
                    </div>
                )
                : (<div className='hidden md:block'>
                    <NavLink to='/signin' className='p-4 hover:text-accent'>Sign In</NavLink>
                    <NavLink to='/signup' className='bg-button text-btnText px-5 py-2 ml-2 rounded-2xl shadow-lg hover:shadow-2xl'>Sign Up</NavLink>
                </div>)}

            {/* Menu Icon */}
            <div onClick={changeNav} className='block md:hidden cursor-pointer z-10'>
                {nav ? <AiOutlineClose size={20} /> : <AiOutlineMenu size={20} />}
            </div>
            {/* Mobile Menu */}
            <div className={
                nav
                    ? 'md:hidden fixed left-0 top-20 flex flex-col items-center justify-between w-full h-[90%] bg-primary ease-in duration-300 z-10'
                    : 'fixed left-[-100%] top-20 h-[90%] flex flex-col items-center justify-between ease-in duration-300'
            }>
                <ul className='w-full p-4'>
                    <li onClick={changeNav} className='border-b py-6'>
                        <NavLink to='/'>Home</NavLink>
                    </li>
                    <li onClick={changeNav} className='border-b py-6'>
                        <NavLink to='/account'>Account</NavLink>
                    </li>
                    <li className='py-6'>
                        <ThemeToggle />
                    </li>
                </ul>
                <div className='flex flex-col w-full p-4'>
                    <NavLink to='/signin'>
                        <button onClick={changeNav}
                        className='w-full my-2 p-3 bg-primary text-primary border border-secondary rounded-2xl shadow-xl'>Sign In</button>
                    </NavLink>
                    <NavLink to='/signup'>
                        <button onClick={changeNav}
                        className='w-full my-2 p-3 bg-button text-btnText rounded-2xl shadow-xl'>Sign un</button>
                    </NavLink>
                </div>
            </div>
        </div>
    )
}

export default Navbar