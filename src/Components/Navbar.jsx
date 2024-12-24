import React, { useContext, useEffect, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import AuthContext from '../Providers/Authcontext';
import userIcon from '../assets/user/user.png'
import { Helmet } from 'react-helmet';

const Navbar = () => {
    const { user, handleSignOut } = useContext(AuthContext)
    const [userPhoto, setUserPhoto] = useState(user?.photoURL || userIcon);

    useEffect(() => {
        setUserPhoto(user?.photoURL || userIcon);
    }, [user])

    const links = <>
        <NavLink className='text-xl' to='/'>Home</NavLink>
        <NavLink className='text-xl' to='services'>Services</NavLink>
        {user && user.email && (
            <div className="dropdown dropdown-hover text-2xl">
                <label tabIndex={0} className="btn btn-ghost">
                    Dashboard
                </label>
                <ul tabIndex={0} className="dropdown-content menu p-2 py-3 shadow bg-gray-100 rounded-box w-52 text-xl z-50">
                    <NavLink to="addServices">Add Service</NavLink>
                    <NavLink to="manageServices">Manage Service</NavLink>
                    <NavLink to="booked-service">Booked Services</NavLink>
                    <NavLink to="service-to-do">Services To Do</NavLink>
                </ul>
            </div>
        )}
    </>

    return (
        <div className='w-10/12 mx-auto py-3'>
            <Helmet>
                <title>Service Sharing | Home</title>
            </Helmet>
            <div className="navbar bg-base-100">
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
                            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
                            {links}
                        </ul>
                    </div>
                    <Link to='/' className="btn btn-ghost text-xl">SERVICE</Link>
                </div>
                <div className="navbar-end gap-3">
                    {links}
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


// import React, { useContext, useEffect, useState } from 'react';
// import { NavLink } from 'react-router-dom';
// import userIcon from '../../assets/user.png'
// import { AuthContext } from '../../authProvider/AuthProvider';
// import { Helmet } from 'react-helmet';

// const Header = () => {
//     const { user, handleSignOut, theme, toggleTheme } = useContext(AuthContext)
//     const [userPhoto, setUserPhoto] = useState(user?.photoURL || userIcon);

//     useEffect(() => {
//         setUserPhoto(user?.photoURL || userIcon);
//     }, [user]);

//     return (
//         <div className={`bg-${theme == "light" ? "white" : "black"} text-${theme == "light" ? "black" : "white"} sticky top-0 z-50`}>
//             <div className="navbar w-11/12 mx-auto py-5">
//                 <Helmet>
//                     <title>Movie Portal | Home</title>
//                 </Helmet>
//                 <div className="navbar-start">
//                     <div className="dropdown">
//                         <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
//                             <svg
//                                 xmlns="http://www.w3.org/2000/svg"
//                                 className="h-5 w-5"
//                                 fill="none"
//                                 viewBox="0 0 24 24"
//                                 stroke="currentColor">
//                                 <path
//                                     strokeLinecap="round"
//                                     strokeLinejoin="round"
//                                     strokeWidth="2"
//                                     d="M4 6h16M4 12h8m-8 6h16" />
//                             </svg>
//                         </div>
//                         <ul
//                             tabIndex={0}
//                             className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
//                             <NavLink className={({ isActive }) => isActive ? "text-blue-500 pr-2" : "pr-2"} to='/' >Home</NavLink>
//                             <NavLink to='allMovies' className={({ isActive }) => isActive ? "text-blue-500 pr-2" : "pr-2"}>All Movies</NavLink>
//                             <NavLink to='favourite' className={({ isActive }) => isActive ? "text-blue-500 pr-2" : "pr-2"}>My Favorites</NavLink>
//                             <NavLink to='/about' className={({ isActive }) => isActive ? "text-blue-500 pr-2" : "pr-2"}>About</NavLink>
//                             <NavLink to='/addAMovie' className={({ isActive }) => isActive ? "text-blue-500 pr-2" : "pr-2"}>Add Movie</NavLink>
//                         </ul>
//                     </div>
//                     <a className="text-2xl font-bold">MOVIE PORTAL</a>
//                 </div>
//                 <div className="navbar-center hidden lg:flex">
//                     <ul className="menu menu-horizontal px-1 text-xl">
//                         <NavLink className={({ isActive }) => isActive ? "text-blue-500 pr-2" : "pr-2"} to='/' >Home</NavLink>
//                         <NavLink to='allMovies' className={({ isActive }) => isActive ? "text-blue-500 pr-2" : "pr-2"}>All Movies</NavLink>
//                         <NavLink to='favourite' className={({ isActive }) => isActive ? "text-blue-500 pr-2" : "pr-2"}>My Favorites</NavLink>
//                         <NavLink to='/about' className={({ isActive }) => isActive ? "text-blue-500 pr-2" : "pr-2"}>About</NavLink>
//                         <NavLink to='/addAMovie' className={({ isActive }) => isActive ? "text-blue-500 pr-2" : "pr-2"}>Add Movie</NavLink>
//                     </ul>
//                 </div>
//                 <div className="navbar-end gap-3">
//                     <button onClick={toggleTheme} className="btn btn-secondary">
//                         {theme === "light" ? "Dark Mode" : "Light Mode"}
//                     </button>

// {
//     user && user?.email ? (
//         <div className="relative group">
//             <img
//                 className="w-12 h-12 rounded-full cursor-pointer border-2 border-white"
//                 src={userPhoto}
//                 alt="User Profile"
//             />
//             <span className="absolute left-1/2 transform -translate-x-1/2 bottom-[-30px] bg-black text-white text-sm rounded-md py-1 px-3 opacity-0 group-hover:opacity-100 transition-opacity">
//                 {user?.displayName || "User"}
//             </span>
//         </div>
//     ) : (
//     <img className="w-12 h-12 rounded-full" src={userIcon} alt="Default User Icon" />
// )
// }

// {
//     user && user?.email ? (<button onClick={handleSignOut} className="btn btn-primary">Log-Out</button>) : (<NavLink to='signin'>
//         <button className="btn btn-primary pr-3">Login</button>
//     </NavLink>)
// }
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default Header;