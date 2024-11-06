import { baseURL } from 'config/api';
import React, { memo, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { ClipLoader } from 'react-spinners';
import { logout } from 'redux/actions/authActions';
import useClickOutside from 'utils/clickOutside';

const UserMenu = () => {
    const navigate = useNavigate();
    const menuRef = useRef();
    const dispatch = useDispatch();
    const [showMenu, setShowMenu] = useState(false);

    const { loading , user  } = useSelector(state => state.auth);

    useClickOutside(menuRef, () => setShowMenu(false));

    const logoutHandler = () => {
        dispatch(logout(navigate , true))
    };

    return (
        <div className='relative'>
            <button
                className='bg-primary  text-pure rounded-lg w-[35px] h-[35px] flex items-center justify-center'
                onClick={() => setShowMenu(!showMenu)}
            >
                <i className="uil uil-user text-xl"></i>
            </button>

            <div
                ref={menuRef}
                className={`absolute top-[110%] right-0 w-[250px] h-auto bg-pure shadow-circle rounded-lg 
                transition-all duration-300 ease-in-out transform z-[99999] ${
                    showMenu ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-[-10px] pointer-events-none'
                }`}
            >
                <div className='p-4 border-b border-b-grayText flex items-center gap-3'>
                    <div className='bg-primary text-pure font-semibold w-[40px] h-[40px] rounded-full flex items-center justify-center shrink-0'>
                        <span>
                            {user?.username?.split(' ')[0]?.charAt(0)?.toUpperCase()}
                            {user?.username?.split(' ')[1]?.charAt(0)?.toUpperCase() || ''}
                        </span>
                    </div>
                    <div>
                        <p className=''>
                            {user?.username}
                        </p>
                        <p className='-translate-y-1 text-[13px] text-grayText truncate'>
                            {user?.email}
                        </p>
                    </div>
                </div>
                <div className='flex flex-col'>
                    {/* <Link
                        to='/app/update-password'
                        className='flex items-center gap-2 py-2 px-4 border-b border-b-grayText hover:bg-primary hover:text-pure cursor-pointer duration-200 ease-in-out text-sm'
                    >
                        <i className="uil uil-lock text-lg"></i>
                        <p>Update Password</p>
                    </Link> */}
                    <button
                        onClick={logoutHandler}
                        className='flex items-center gap-2 py-2 px-4 hover:bg-primary hover:text-pure cursor-pointer duration-200 ease-in-out rounded-bl-lg rounded-br-lg text-sm'
                    >
                        {
                            loading 
                            ? 
                                <ClipLoader size={20} color='white' />
                            : 
                                <>
                                    <i className="uil uil-signout text-lg"></i>
                                    <p>Logout</p>
                                </>
                        }
                    </button>
                </div>
            </div>
        </div>
    );
};

export default memo(UserMenu);
