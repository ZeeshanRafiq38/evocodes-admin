import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { ClipLoader } from 'react-spinners';
import { location_delete } from 'redux/actions/locationActions';
import confirmBox from 'utils/confirmBox';

const LocationItem = ({ item }) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [selectedDoc , setSelectedDoc] = useState('')

    const { deleteLoading } = useSelector(state => state.location);

    const EditHandler = (location) => {
        navigate(`/app/locations/edit/${location?.slug}`)
    }

    const deleteHandler = (location) => {
        const message = 'Are you sure? You want to delete this location?';
        const onYesClick = () => {
            dispatch(location_delete(location?._id))
        }
        confirmBox({ message , onYesClick })
    }

    return (
        <div className='relative group'>
            {
                deleteLoading && item?._id === selectedDoc?._id 
                ? 
                    <div className='absolute w-full rounded-tl-lg rounded-tr-lg top-0 left-0 py-2 text-center text-pure bg-red-500 z-10 text-sm '>
                        deleting...
                    </div>
                : 
                    ''
            }
            <div
                key={item?._id}
                className='rounded-md px-4 py-6 text-center bg-gray-200 sm:text-lg font-medium text-dark'
            >
                {item?.name}

            </div>
            <div className='absolute top-0 left-0 w-full h-full bg-black rounded-lg bg-opacity-50 flex items-center justify-center gap-4 duration-200 ease-in opacity-0 group-hover:opacity-100'>
                <button
                    className='btn-edit'
                    title='Edit Location'
                    onClick={() => EditHandler(item)}
                >
                    <i className="uil uil-pen"></i>
                </button>
                <button
                    className='btn-delete'
                    title='Delete Location'
                    onClick={() => {
                        setSelectedDoc(item)
                        deleteHandler(item)
                    }}
                    disabled={deleteLoading}
                >
                    {
                        deleteLoading && item?._id === selectedDoc?._id
                        ?
                            <ClipLoader size={20} color='white' />
                        :
                            <i className="uil uil-trash"></i>
                    }
                </button>

            </div>
        </div>
    )
}

export default LocationItem