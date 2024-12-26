import React, { useEffect, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import userIcon from '../assets/user/user.png'
import { Helmet } from 'react-helmet';
import useAuth from './Hook/useAuth';

const Navbar = () => {
    const { user, handleSignOut, theme, toggleTheme } = useAuth()
    const [userPhoto, setUserPhoto] = useState(user?.photoURL || userIcon);
    const [isOpen, setIsOpen] = useState(false);

    const toggleDropdown = () => {
        setIsOpen(prevState => !prevState);
    };

    useEffect(() => {
        setUserPhoto(user?.photoURL || userIcon);
    }, [user])

    const links = <>
        <NavLink className={({ isActive }) => isActive ? 'text-blue-500 text-xl ml-2' : 'text-black text-xl ml-2'} to='/'>Home</NavLink>
        <NavLink className={({ isActive }) => isActive ? 'text-blue-500 text-xl ml-2' : 'text-black text-xl ml-2'} to='services'>Services</NavLink>
        {user && user.email && (
            <div className="dropdown dropdown-end text-2xl">
                <label onClick={toggleDropdown} tabIndex={0} className="btn btn-ghost text-xl ml-2">
                    Dashboard
                </label>
                {isOpen && (
                    <ul tabIndex={0} className="dropdown-content menu p-2 py-3 shadow bg-gray-100 rounded-box w-52 text-xl z-50">
                        <NavLink className={({ isActive }) => isActive ? 'text-blue-500 text-xl' : 'text-black text-xl'} to="addServices">Add Service</NavLink>
                        <NavLink className={({ isActive }) => isActive ? 'text-blue-500 text-xl' : 'text-black text-xl'} to="manageServices">Manage Service</NavLink>
                        <NavLink className={({ isActive }) => isActive ? 'text-blue-500 text-xl' : 'text-black text-xl'} to="booked-service">Booked Services</NavLink>
                        <NavLink className={({ isActive }) => isActive ? 'text-blue-500 text-xl' : 'text-black text-xl'} to="service-to-do">Services To Do</NavLink>
                    </ul>
                )}
            </div>
        )}
    </>

    return (
        <div className={`bg-${theme == "light" ? "white" : "gray"} text-${theme == "light" ? "black" : "white"}`}>
            {/* <div className='w-10/12 mx-auto'>
            </div> */}
            <Helmet>
                <title>Service Sharing | Home</title>
            </Helmet>
            <div className="navbar w-10/12 mx-auto py-3 relative">
                <div className="navbar-start">
                    <div className="dropdown">
                        <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-5 w-5"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor">
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M4 6h16M4 12h8m-8 6h16" />
                            </svg>
                        </div>
                        <ul
                            tabIndex={0}
                            className="menu menu-sm dropdown-content bg-base-100 rounded-box mt-3 absolute z-50 w-52 p-2 shadow lg:top-0 lg:translate-y-0 lg:relative lg:flex lg:gap-3">
                            {links}
                        </ul>
                    </div>
                    <Link to='/' className="btn btn-ghost text-xl">SERVICE</Link>
                </div>
                <div className="navbar-center hidden lg:flex">
                    {links}
                </div>
                <div className="navbar-end gap-3">
                    <button onClick={toggleTheme} className="btn btn-secondary">
                        {theme === "light" ? "Dark Mode" : "Light Mode"}
                    </button>
                    {user && user?.email ? (
                        <div className="relative group">
                            <img
                                className="w-12 h-12 rounded-full cursor-pointer border-2 border-white"
                                src={userPhoto}
                                alt="User Profile"
                            />
                            <span className="absolute left-1/2 transform -translate-x-1/2 bottom-[-30px] bg-black text-white text-sm rounded-md py-1 px-3 opacity-0 group-hover:opacity-100 transition-opacity">
                                {user?.displayName || "User"}
                            </span>
                        </div>
                    ) : (
                        <img className="w-12 h-12 rounded-full" src={userIcon} alt="Default User Icon" />
                    )}

                    {
                        user && user?.email ? (<button onClick={handleSignOut} className="btn btn-primary">Log-Out</button>) : (<NavLink to='login'>
                            <button className="btn btn-primary pr-3">Login</button>
                        </NavLink>)
                    }
                </div>
            </div>
        </div>
    );
};

export default Navbar;