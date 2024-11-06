import ApprovedSvg from 'assets/svgs/status/ApprovedSvg'
import DeclinedSvg from 'assets/svgs/status/DeclinedSvg'
import PendingSvg from 'assets/svgs/status/PendingSvg'
import React, { memo } from 'react'



const Status = ({ status }) => {
    return (
        <div
        className={`
            ${
                status === 'pending' || status === 'running'
                ? 
                    'bg-yellow-500 bg-opacity-30 text-[#FFE500]'
                : 
                status === 'completed' || status === 'approved' || status === 'claimed' || status === 'active' || status === 'accepted'
                ?
                    'bg-green-500 bg-opacity-30 text-[#33FF00]'
                : 
                status === 'declined' || status === 'cancelled' || status === 'rejected' || 'expired'
                ? 
                    'bg-red-500 bg-opacity-30 text-[#FF0000]'
                : 
                status === 'dispatched'
                ? 
                    'bg-cyan-500 bg-opacity-30 text-cyan-500'
                :
                status === 'failed'
                ? 
                    'bg-orange-500 bg-opacity-30 text-orange-500'
                :
                    ''
            }
            text-sm px-2 rounded-md flex items-center gap-1 py-1 pb-1.5 font-medium w-fit capitalize
        `}
        >
            {
                status === 'pending' || status === 'running'
                ? 
                    <PendingSvg size={15} />
                : 
                status === 'completed' || status === 'approved' || status === 'claimed'
                ?
                    <ApprovedSvg size={15} />
                : 
                status === 'declined' || status === 'cancelled'
                ?
                    <DeclinedSvg size={15} />
                : 
                    ''

            }
            <span>
                {status}
            </span>
        </div>
    )
}

export default memo(Status)