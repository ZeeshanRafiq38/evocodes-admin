import React, { useRef } from 'react'
import { Outlet } from 'react-router-dom'
import Header from './header'
import Sidebar from './sidebar'
import { useDispatch, useSelector } from 'react-redux'
import useClickOutside from 'utils/clickOutside'
import { setShowSidebar } from 'redux/slices/appSlice'
import { useWindowSize } from 'react-use'

const MainLayout = () => {
    const { width } = useWindowSize();
    const dispatch = useDispatch();
    const sidebarRef = useRef();
    const { showSidebar } = useSelector(state => state.app);

    useClickOutside(sidebarRef , () => showSidebar  ? dispatch(setShowSidebar(false)) : '')


    return (
        <div className='relative'>
            {/* Sidebar */}
            <div 
            ref={sidebarRef}
            className={`
                fixed md:left-0 transition-all duration-300 w-[250px] z-[9999] bg-pure h-full
                border-r-2 border-r-gray-300 overflow-y-auto
                ${showSidebar ? 'left-0' : '-left-[150%]'}
            `}>
                <Sidebar />
            </div>
            {/* Sidebar Overlay */}
            {
                showSidebar && <div className='fixed top-0 left-0 w-full h-screen bg-[#000] bg-opacity-20 '/>
            }
         
            {/* Main Content Area */}
            <div className='md:ml-[250px]'>
                <Header />
                <div 
                className='sm:p-6 p-4 bg-stroke'
                style={{ minHeight : 'calc(100vh - 65px)' , height : '100%'}}
                >
                    <Outlet />
                </div>
            </div>
        </div>
    )
}

export default MainLayout
