import React, { memo, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import menuItems from 'constants/sidebar.constants';
import { useDispatch, useSelector } from 'react-redux';
import { setShowSidebar } from 'redux/slices/appSlice';

const Sidebar = () => {
    const location = useLocation(); 
    const { showSidebar } = useSelector(state => state.app);

    const [openSubMenus, setOpenSubMenus] = useState({
        6 : true ,
    });

    const toggleSubMenu = (index) => {
        setOpenSubMenus((prev) => ({
            ...prev,
            [index]: !prev[index],
        }));
    };

    const checkIsActive = (path, exact = false) => {
        if (exact) {
            return location.pathname === path;
        }
        return location.pathname.startsWith(path);
    };

    const dispatch = useDispatch();

    const closeSideBar = () => {
        if(showSidebar) {
            dispatch(setShowSidebar(false))
        }
    }

    return (
        <div className='w-full min-h-screen max-h-full '>
            <div>
                <h1 className='text-3xl font-bold text-center py-4 border-b border-b-gray-300'>
                    Evocodes
                </h1>
                <ul className='px-3 py-6 flex flex-col gap-4 '>
                    {menuItems.map((item, index) => {
                        const isActive = checkIsActive(item.path, !item.submenu);
                        return (
                            <li key={item.id} className=''>
                                <Link 
                                    to={item.path}
                                    className={`flex items-center gap-2 duration-200 ease-in-out px-2 hover:bg-primary hover:text-pure rounded-md py-2 
                                    ${isActive ? 'bg-primary text-white' : '' }
                                    `}
                                    onClick={closeSideBar}
                                >
                                    <i className={`uil uil-${item.icon}`} />
                                    <p>{item.name}</p>
                                </Link>
                            </li>
                        );
                    })}
                </ul>
            </div>
        </div>
    );
};

export default memo(Sidebar);
