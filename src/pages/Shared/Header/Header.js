import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../../context/AuthProvider/AuthProvider';

const Header = () => {
    const { user, logOut } = useContext(AuthContext);
    const links = <>
        <li><Link to='/'>Home</Link></li>
        <li><Link to='/media'>Media</Link></li>
        <li><Link to='/about'>About</Link></li>
    </>
    return (
        <div className="navbar bg-gray-800 text-white mb-10">
            <div className="navbar-start">
                <div className="dropdown">
                    <label tabIndex={0} className="btn btn-ghost lg:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                    </label>
                    <ul tabIndex={1} className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52">
                        <ul className="p-2 text-black">
                            {links}
                        </ul>
                    </ul>
                </div>
                <span className="text-4xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-violet-500">
                    Viral Media
                </span>
            </div>
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1">
                    {links}
                </ul>
            </div>
            <div className="navbar-end">
                {
                    user?.email ?
                        <button onClick={logOut} to='/login' className="btn glass">Logout</button>
                        :
                        <>
                            <Link to='/login' className="btn glass mr-4">Login</Link>
                            <Link to='/register' className="btn glass">Register</Link>
                        </>
                }
            </div>
        </div>
    );
};

export default Header;