import { baseURL } from 'config/api';
import moment from 'moment';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { ClipLoader } from 'react-spinners';
import { blog_delete } from 'redux/actions/blogActions';
import { setDeleteLoading, setDocDetails } from 'redux/slices/blogSlice';
import confirmBox from 'utils/confirmBox';

const imgDir = '/blogs/'


const BlogCard = ({ blog }) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [selectedDoc , setSelectedDoc] = useState('')

    const { deleteLoading } = useSelector(state => state.blog);

    const EditHandler = (blog) => {
        dispatch(setDocDetails(blog));
        navigate(`/app/blogs/edit/${blog?.slug}`)
    }

    const deleteHandler = (blog) => {
        const message = 'Are you sure? You want to delete this blog?';
        const onYesClick = () => {
            dispatch(blog_delete(blog?._id))
        }
        confirmBox({ message , onYesClick })
    }

    return (
        <div className='relative rounded-lg border bg-gray-100 p-4 flex flex-col gap-4 hover:shadow-xl duration-200 ease-in-out group'>
            {
                deleteLoading && blog?._id === selectedDoc?._id 
                ? 
                    <div className='absolute w-full rounded-tl-lg rounded-tr-lg top-0 left-0 py-2 text-center text-pure bg-red-500 z-10 text-sm '>
                        deleting...
                    </div>
                : 
                    ''
            }
            <div>
                <img 
                src={baseURL + '/' + blog?.image} 
                alt="Cover Image" 
                className='w-full h-[200px] object-cover rounded-lg' 
                />
            </div>
            <div className='flex items-center gap-3'>
                {
                    blog?.tags.map(item => (
                        <div key={item} className='bg-green-200 text-green-700 py-1.5 px-2.5 rounded-md text-sm'>
                            {item}
                        </div>
                    ))
                }
            </div>
            <h1 className='text-lg font-semibold text-black hover:underline'>
                <Link to={`/blogs/${blog?._id}`}>
                   {blog?.title}
                </Link>
            </h1>
            <p className='text-grayText'>
                {blog?.shortDescription?.slice(0,60)} {blog?.shortDescription?.length > 60 && ('...')}
            </p>

            <div className='flex items-center gap-8'>
                <div className='flex items-center gap-2 text-dark'>
                    <i className="uil uil-calendar-alt text-primary"></i>
                    <p>
                        {moment(blog?.createdAt).format('MMM DD YYYY')}
                    </p>
                </div>
            </div>

            <div className='absolute bottom-4 right-4 items-center gap-2 group-hover:flex hidden'>
                <button 
                className='btn-edit'
                title='Edit Blog'
                onClick={() => EditHandler(blog)}
                >
                    <i className="uil uil-pen"></i>
                </button>
                <button 
                className='btn-delete'
                title='Delete Blog'
                onClick={() => {
                    setSelectedDoc(blog)
                    deleteHandler(blog)
                }}
                disabled={deleteLoading}
                >
                    {
                        deleteLoading && blog?._id === selectedDoc?._id
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

export default BlogCard