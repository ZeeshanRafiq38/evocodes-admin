import NotFoundSvg from 'assets/svgs/NotFoundSvg'
import React, { memo } from 'react'
import { useWindowSize } from 'react-use';

const ItemNotFound = ({ message = 'No item found.'}) => {
    const { width } = useWindowSize();

    return (
        <div className='w-full sm:h-[250px] h-[180px] rounded-md flex items-center flex-col gap-4 mt-4 justify-center sm:text-2xl text-lg sm:font-semibold font-medium border border-gray-300 '>
            <NotFoundSvg size={width > 600 ? 120 : 70} />
            <span>
                {message}
            </span>
        </div>
    )
}

export default memo(ItemNotFound)