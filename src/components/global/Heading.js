import React, { memo } from 'react'

const Heading = ({ title ,  icon , docsCount }) => {
    return (
        <div className='flex items-center gap-3'>
            <h1 className='font-semibold text-dark xl:text-2xl md:text-xl text-lg flex items-center gap-2 '>
                { icon && <i className={`uil uil-${icon}`}></i> }
                <span>{title}</span>
            </h1>
            {
                docsCount && (
                    <div className='bg-secondary text-sm text-pure w-[25px] h-[25px] rounded-md flex items-center justify-center'>
                        {docsCount}
                    </div>
                )
            }
        </div>
    )
}

export default memo(Heading)