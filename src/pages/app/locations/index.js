import DisplayError from 'components/global/DisplayError';
import Heading from 'components/global/Heading'
import ItemNotFound from 'components/global/ItemNotFound';
import Loader from 'components/global/Loader';
import LocationItem from 'components/locations/LocationItem';
import Axios from 'config/api';
import { useQuery } from 'react-query';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom'
import { setStats } from 'redux/slices/locationSlice';
import returnErrorMsg from 'utils/returnErrorMsg';

const Locations = () => {
    const dispatch = useDispatch();

    const { docs } = useSelector(state => state.location);

    const queryKey = ['fetch-all-locations'];
    const { isLoading , isError , error }  = useQuery(queryKey , () => {
        return Axios(`/location`);
    } , { 
        refetchOnWindowFocus : false, 
        onSuccess: (data) => {
            const { data : { data : { docs } } } = data;
            dispatch(setStats({ docs }))
        }
    });



    return (
        <div>
            <div className='flex items-center justify-between gap-4'>
                <div className='flex items-center gap-4'>
                    <Heading title='All Locations' showIcon={false} docsCount={docs?.length} />
                </div>
                <Link to='/app/locations/add' 
                className="btn-primary py-2 5 px-6"
                >
                    Add New Location
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
                    docs?.length > 0 
                    ? 
                        <div className='grid xl:grid-cols-5 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-4 sm:mt-10 mt-6 mb-20'>
                            {
                                docs?.map(item => (
                                    <LocationItem
                                    key={item?._id} 
                                    item={item}
                                    />
                                ))
                            }
                        </div>
                    : 
                        <ItemNotFound message='No location created yet.' />
                }
            </div>
        </div>
    )
}

export default Locations