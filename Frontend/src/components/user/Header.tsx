import React from 'react';
import logo from '../../assets/logo.jpeg'
import { NavLink } from 'react-router-dom'
import { Menu, X } from 'lucide-react';


const Header = () => {
    const [visible, setVisible] = React.useState(true);
    const [isMenuOpen, setIsMenuOpen] = React.useState(false);
    const [prevScrollPos, setPrevScrollPos] = React.useState(0);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    React.useEffect(() => {
        const handleScroll = () => {
            const currentScrollPos = window.scrollY;

            // Set visible based on scroll direction
            setVisible(prevScrollPos > currentScrollPos || currentScrollPos < 10);

            setPrevScrollPos(currentScrollPos);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [prevScrollPos]);

    return (
        <header
            className={`fixed top-0 left-0 w-full bg-white z-50 transition-transform duration-500 ease-in-out ${visible ? 'translate-y-0' : '-translate-y-full'
                }`}
        >
            <div className='p-5 border-t-4 border-orange-400'>
                <div className='flex items-center justify-around p-3'>
                    <div className='w-1/4 md:w-1/4'>
                        <img className='w-20 h-20 md:w-40 md:h-40' src={logo} alt="Gaudiya Yuboshakti" />
                    </div>
                    <div>
                        <p className="text-2xl md:text-4xl uppercase text-orange-500 font-bold inline-block pb-1 transition-all ease-in-out duration-300 border-b-0 hover:border-b-4 border-transparent hover:border-orange-700 hover:text-orange-700">
                            gaudiya yuboshakti
                        </p>
                    </div>

                    {/* Mobile Menu Button */}
                    <div className="md:hidden">
                        <button
                            onClick={toggleMenu}
                            className="text-orange-500 hover:text-orange-700 focus:outline-none"
                        >
                            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
                        </button>
                    </div>
                </div>

                {/* Desktop Navigation */}
                <div className="top-nav border-t-2 p-3 shadow hidden md:flex items-center justify-around flex-wrap">
                    <div className="menus w-1/2">
                        <ul className='menu-list list-none flex items-center gap-10'>
                            <NavLink to='/' className="menu-item text-xl transition-all duration-300 hover:text-orange-500">Home</NavLink>
                            <NavLink to='/research' className="menu-item text-xl transition-all duration-300 hover:text-orange-500">Research</NavLink>
                            <NavLink to='/centers' className="menu-item text-xl transition-all duration-300 hover:text-orange-500">Centers</NavLink>
                            <NavLink to='/forums' className="menu-item text-xl transition-all duration-300 hover:text-orange-500">Forums</NavLink>
                            <NavLink to='/events' className="menu-item text-xl transition-all duration-300 hover:text-orange-500">Events</NavLink>
                            <NavLink to='/about' className="menu-item text-xl transition-all duration-300 hover:text-orange-500">About Us</NavLink>
                        </ul>
                    </div>
                    <div>
                        {/* Empty div as in original */}
                    </div>
                </div>

                {/* Mobile Menu */}
                {isMenuOpen && (
                    <div className="md:hidden border-t-2 p-3 shadow">
                        <ul className='list-none flex flex-col items-center gap-4'>
                            <NavLink to='/' className="menu-item text-xl py-2 transition-all duration-300 hover:text-orange-500">Home</NavLink>
                            <NavLink to='/research' className="menu-item text-xl py-2 transition-all duration-300 hover:text-orange-500">Research</NavLink>
                            <NavLink to='/centers' className="menu-item text-xl py-2 transition-all duration-300 hover:text-orange-500">Centers</NavLink>
                            <NavLink to='/forums' className="menu-item text-xl py-2 transition-all duration-300 hover:text-orange-500">Forums</NavLink>
                            <NavLink to='/events' className="menu-item text-xl py-2 transition-all duration-300 hover:text-orange-500">Events</NavLink>
                            <NavLink to='/about' className="menu-item text-xl py-2 transition-all duration-300 hover:text-orange-500">About Us</NavLink>
                        </ul>
                    </div>
                )}
            </div>
        </header>
    )
}

export default Header