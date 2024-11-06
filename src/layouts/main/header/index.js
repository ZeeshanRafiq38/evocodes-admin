import React, { memo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setShowSidebar } from 'redux/slices/appSlice';
import UserMenu from './UserMenu';
import { baseURL } from 'config/api';

const Header = () => {
    const dispatch = useDispatch();
    const { showSidebar } = useSelector(state => state.app);
    const { user } = useSelector(state => state.auth)

    return (
        <div className='bg-pure p-4 flex items-center justify-between border-b border-b-gray-300'>
            <div className='flex items-center sm:gap-3 gap-2 sm:text-base text-sm'>
                <div className='bg-primary text-pure font-medium sm:w-[40px] sm:h-[40px] w-[35px] h-[35px] rounded-full flex items-center justify-center'>
                    <span>
                        {user?.username?.split(' ')[0]?.charAt(0)?.toUpperCase()}
                        {user?.username?.split(' ')[1]?.charAt(0)?.toUpperCase() || ''}
                    </span>
                </div>
                <p>
                    {user?.username}
                </p>
            </div>
            <div className='flex items-center gap-4'>
                <UserMenu />
                <div className='md:hidden block'>
                    <button 
                    onClick={() => dispatch(setShowSidebar(true))}
                    className='bg-primary text-pure shadow-circle rounded-lg w-[35px] h-[35px] flex items-center justify-center pb-1'
                    >
                        {
                            showSidebar
                            ? 
                                <i className="uil uil-times text-2xl"></i>
                            : 
                                <i className="uil uil-bars text-2xl"></i>
                        }

                    </button>
                </div>
            </div>
        </div>
    )
}

export default memo(Header) 