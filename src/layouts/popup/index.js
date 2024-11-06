import React, { useRef } from 'react'
import { useDispatch } from 'react-redux';
import useClickOutside from 'utils/clickOutside';

const PopupLayout = ({ children , setShowPopup , width , redux , clickoutSide = true }) => {
    const dispatch = useDispatch();
    const popupRef = useRef();
 
    useClickOutside(popupRef , () => {
        if(!clickoutSide) return;
        togglePopup();
    });

    function togglePopup () {
        
        if(redux) {
            dispatch(setShowPopup(false));
        } else {
            setShowPopup(false)
        }
    }

    return (
        <div className='fixed top-0 left-0 w-full bg-black bg-opacity-50 flex items-center justify-center px-3 h-screen z-[9999]'>
            <div 
            className={`popup bg-secondary ${width ? width : 'lg:w-[50%] md:w-[65%] sm:w-[80%] w-full'} rounded-lg sm:px-8 px-4 pb-8 py-4 relative`}
            ref={popupRef}
            >
                <div 
                className='absolute top-2 right-3 text-2xl cursor-pointer font-semibold w-fit ' 
                onClick={togglePopup}
                >
                    <i className="uil uil-times"></i>
                </div>
                <div>
                    {children}
                </div>
            </div>
        </div>
    )
}

export default PopupLayout