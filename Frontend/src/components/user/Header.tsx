import logo from '../../assets/logo.jpeg'
import { NavLink } from 'react-router-dom'


const Header = () => {
    return (
        <div className='p-5 border-t-4 border-orange-400'>
            <div className='flex items-center justify-around p-3'>
                <div className='w-1/4'>
                    <img className='w-40 h-40' src={logo} alt="" />
                </div>
                <div>
                    <p className="text-4xl uppercase text-orange-500 font-bold inline-block pb-1 transition-all ease-in-out duration-300 border-b-0 hover:border-b-4 border-transparent hover:border-orange-700 hover:text-orange-700">
                        gaudiya yuboshakti
                    </p>

                </div>
            </div>
            <div className="top-nav border-t-2 p-3 shadow flex items-center justify-around flex-wrap">
                <div className="menus w-1/2">
                    <ul className='menu-list list-none flex items-center gap-10'>
                        <NavLink to='' className="menu-item text-xl">Research</NavLink>
                        <NavLink to='' className="menu-item text-xl">Centers</NavLink>
                        <NavLink to='' className="menu-item text-xl">Forums</NavLink>
                        <NavLink to='' className="menu-item text-xl">Events</NavLink>
                        <NavLink to='' className="menu-item text-xl">About Us</NavLink>
                    </ul>
                </div>
                <div>

                </div>
            </div>
        </div>
    )
}

export default Header