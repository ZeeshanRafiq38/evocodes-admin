import { useState } from 'react';
import { useQuery } from 'react-query';
import { Link } from 'react-router-dom';
import Axios from 'config/api';
import Heading from 'components/global/Heading';
import Loader from 'components/global/Loader';
import returnErrorMsg from 'utils/returnErrorMsg';

export const formatDate = value => new Date(value).toLocaleString(undefined, { dateStyle: 'medium', timeStyle: 'short' });
export const ReadStatus = ({ isRead }) => <span className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${isRead ? 'bg-gray-100 text-gray-600' : 'bg-orange-100 text-orange-800'}`}>{isRead ? 'Read' : 'Unread'}</span>;

export default function Enquiries() {
    const [page, setPage] = useState(1);
    const [status, setStatus] = useState('all');
    const { data, isLoading, isFetching, error, refetch } = useQuery(['enquiries', status, page], async () => {
        const response = await Axios.get('/contact', { params: { page, status } });
        return response.data.data;
    }, { keepPreviousData: true, refetchOnWindowFocus: false });

    return <section className='min-w-0'>
        <div className='flex flex-wrap items-center justify-between gap-4'>
            <div><Heading title='Enquiries' showIcon={false} /><p className='mt-2 text-sm text-gray-500'>{data ? `${data.total} enquiries · ${data.unread} unread overall` : 'Customer messages from the website'}</p></div>
            <button type='button' className='btn-primary px-5 py-2' disabled={isFetching} onClick={() => refetch()}>{isFetching ? 'Refreshing…' : 'Refresh'}</button>
        </div>
        <div className='mt-6 flex flex-wrap items-center gap-3'>
            <label htmlFor='enquiry-status' className='text-sm font-medium'>Show</label>
            <select id='enquiry-status' value={status} onChange={e => { setStatus(e.target.value); setPage(1); }} className='rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm'>
                <option value='all'>All enquiries</option><option value='unread'>Unread</option><option value='read'>Read</option>
            </select>
            <p className='text-xs text-gray-500'>Dates shown in your local time.</p>
        </div>
        {error ? <p role='alert' className='mt-6 rounded-lg bg-red-50 p-4 text-red-700'>{returnErrorMsg(error)}</p> : isLoading ? <Loader /> : <>
            <div className='mt-6 overflow-hidden rounded-xl border border-gray-200 bg-white' aria-busy={isFetching}>
                {!data?.docs.length ? <p className='p-8 text-center text-gray-500'>No {status === 'all' ? '' : status + ' '}enquiries yet.</p> : <ul className='divide-y divide-gray-100'>
                    {data.docs.map(item => <li key={item._id} className={`flex flex-col gap-3 p-5 sm:flex-row sm:items-center sm:justify-between ${!item.isRead ? 'bg-orange-50/40' : ''}`}>
                        <div className='min-w-0'>
                            <Link to={`/app/enquiries/${item._id}`} className='font-semibold text-dark hover:text-primary break-words'>{item.name}</Link>
                            <a href={`mailto:${item.email}`} className='mt-1 block text-sm text-gray-600 hover:underline break-all'>{item.email}</a>
                            {item.company && <p className='mt-1 text-sm text-gray-500 break-words'>{item.company}</p>}
                            <p className='mt-2 text-xs text-gray-500 break-words'>{item.services.join(' · ')}</p>
                        </div>
                        <div className='flex shrink-0 flex-wrap items-center gap-3 sm:flex-col sm:items-end'>
                            <ReadStatus isRead={item.isRead} />
                            <time dateTime={item.createdAt} className='text-xs text-gray-500'>{formatDate(item.createdAt)}</time>
                            <Link to={`/app/enquiries/${item._id}`} className='text-sm font-medium text-primary hover:underline'>View message →</Link>
                        </div>
                    </li>)}
                </ul>}
            </div>
            <div className='mt-5 flex items-center justify-between gap-3 text-sm'>
                <button type='button' className='rounded-lg border px-4 py-2 disabled:opacity-40' disabled={page <= 1 || isFetching} onClick={() => setPage(value => value - 1)}>Previous</button>
                <span>Page {page} of {data?.pages || 1}</span>
                <button type='button' className='rounded-lg border px-4 py-2 disabled:opacity-40' disabled={page >= (data?.pages || 1) || isFetching} onClick={() => setPage(value => value + 1)}>Next</button>
            </div>
        </>}
    </section>;
}
