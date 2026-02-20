import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { removeUser } from '../utils/userSlice'

const Navbar = () => {
    const user = useSelector((store) => store.user.user);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const handleLogout = async () => {
        try {
            await axios.post(`${import.meta.env.VITE_BACKEND_API_URL}/auth/logout`, {}, { withCredentials: true });
            dispatch(removeUser());
            navigate('/login');
        } catch (error) {
            console.log(error?.response?.data?.message || error.message);
        }
    }
    return (
        <div className="navbar bg-neutral shadow-sm px-5">
            <div className="flex-1">
                <a className="btn btn-ghost text-xl">👨🏻‍💻 DevTinder</a>
            </div>
            <div className="flex gap-2">
                {/* <input type="text" placeholder="Search" className="input input-bordered w-24 md:w-auto" /> */}
                {user &&
                    (
                        <>
                            <div className='flex gap-2'>
                                <p className='btn btn-neutral'>Welcome, {user?.firstName}</p>
                            </div>
                            <div className="dropdown dropdown-end bg-neutral">
                                <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                                    <div className="w-10 rounded-full">
                                        <img
                                            alt="Tailwind CSS Navbar component"
                                            src={user?.profilePicture || "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"} />
                                    </div>
                                </div>
                                <ul
                                    tabIndex="-1"
                                    className="menu menu-sm dropdown-content bg-neutral rounded-box z-1 mt-3 w-52 p-2 shadow">
                                    <li>
                                        <a className="justify-between">
                                            Profile
                                            <span className="badge">New</span>
                                        </a>
                                    </li>
                                    <li><a>Settings</a></li>
                                    <li><a onClick={handleLogout}>Logout</a></li>
                                </ul>
                            </div>
                        </>
                    )
                }
            </div>
        </div>
    )
}

export default Navbar