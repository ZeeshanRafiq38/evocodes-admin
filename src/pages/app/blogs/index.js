import Blog from 'components/blogs/Blog';
import DisplayError from 'components/global/DisplayError';
import Heading from 'components/global/Heading';
import ItemNotFound from 'components/global/ItemNotFound';
import Loader from 'components/global/Loader';
import Pagination from 'components/global/pagination';
import Axios from 'config/api';
import { useQuery } from 'react-query';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { setCurrentPage, setStats } from 'redux/slices/blogSlice';
import returnErrorMsg from 'utils/returnErrorMsg';

const Blogs = () => {
    const dispatch = useDispatch();

    const { docs : blogs , currentPage , pages , docsCount , keyword , sort } = useSelector(state => state.blog);

    const queryKey = ['fetch-all-blogs' , currentPage , keyword , sort ];
    const { isLoading , isError , error } = useQuery(queryKey , () => {
        return Axios(`/blog/for-admin?page=${currentPage}&keyword=${keyword}&sort=${sort}`);
    } , { 
        refetchOnWindowFocus : false,
        onSuccess: (data) => {
            const { data : { data : { page , pages , docs , docsCount } } } = data;
            dispatch(setStats({ docs , pages , page , docsCount }))
        }
    });


    return (
        <div>
            <div className='flex items-center justify-between gap-4'>
                <div className='flex items-center gap-4'>
                    <Heading title='Blogs' showIcon={false} docsCount={docsCount} />
                </div>
                <Link to='/app/blogs/add' 
                className="btn-primary py-2 5 px-6"
                >
                    Create New Blog
                </Link>
            </div>
            <div className="mt-8">
                {
                    isLoading 
                    ? 
                        <Loader />
                    : 
                    isError
                    ? 
                        <DisplayError message={returnErrorMsg(error)} />
                    : 
                    blogs?.length > 0 
                    ? 
                        <div className='mt-6 grid 2xl:grid-cols-4 lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-8'>
                            {
                                blogs?.map(item => (
                                    <Blog blog={item} />
                                ))
                            }
                        </div>
                    : 
                        <ItemNotFound message='No blog found.' />

                }
                <div className='mt-8'>
                    <Pagination
                    currentPage={currentPage}
                    totalPages={pages}
                    setCurrentPage={setCurrentPage}
                    />
                </div>
            </div>
        </div>
    )
}

export default Blogs