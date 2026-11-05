import { useMutation, useQuery, useQueryClient } from 'react-query';
import { Link, useParams } from 'react-router-dom';
import Axios from 'config/api';
import Loader from 'components/global/Loader';
import returnErrorMsg from 'utils/returnErrorMsg';
import { formatDate, ReadStatus } from './index';

export default function EnquiryDetails() {
    const { id } = useParams();
    const cache = useQueryClient();
    const key = ['enquiry', id];
    const { data: enquiry, isLoading, error } = useQuery(key, async () => {
        const response = await Axios.get(`/contact/${id}`);
        return response.data.data.doc;
    }, { refetchOnWindowFocus: false });
    const changeStatus = useMutation(isRead => Axios.patch(`/contact/${id}/read`, { isRead }), {
        onSuccess: response => {
            cache.setQueryData(key, current => ({ ...current, ...response.data.data.doc }));
            cache.invalidateQueries('enquiries');
        },
    });

    return <section className='mx-auto max-w-4xl min-w-0'>
        <Link to='/app/enquiries' className='text-sm text-primary hover:underline'>← All enquiries</Link>
        {isLoading ? <Loader /> : error ? <p role='alert' className='mt-6 rounded-lg bg-red-50 p-4 text-red-700'>{returnErrorMsg(error)}</p> : enquiry && <article className='mt-6 overflow-hidden rounded-2xl border border-gray-200 bg-white'>
            <header className='flex flex-wrap items-center justify-between gap-4 border-b border-gray-100 p-5 sm:p-8'>
                <div className='min-w-0'><p className='text-xs uppercase tracking-wider text-gray-500'>Customer enquiry</p><h1 className='mt-2 text-2xl font-semibold break-words'>{enquiry.name}</h1><time dateTime={enquiry.createdAt} className='mt-2 block text-sm text-gray-500'>{formatDate(enquiry.createdAt)} (local time)</time></div>
                <ReadStatus isRead={enquiry.isRead} />
            </header>
            <div className='space-y-6 p-5 sm:p-8'>
                <dl className='grid gap-5 sm:grid-cols-2'>
                    <div><dt className='text-xs uppercase text-gray-500'>Email</dt><dd className='mt-1 break-all'><a href={`mailto:${enquiry.email}`} className='text-primary hover:underline'>{enquiry.email}</a></dd></div>
                    <div><dt className='text-xs uppercase text-gray-500'>Company</dt><dd className='mt-1 break-words'>{enquiry.company || 'Not provided'}</dd></div>
                    <div className='sm:col-span-2'><dt className='text-xs uppercase text-gray-500'>Services</dt><dd className='mt-2 flex flex-wrap gap-2'>{enquiry.services.map(service => <span key={service} className='rounded-full bg-gray-100 px-3 py-1 text-sm'>{service}</span>)}</dd></div>
                </dl>
                <div><h2 className='font-semibold'>Message</h2><p className='mt-3 whitespace-pre-wrap break-words rounded-xl bg-gray-50 p-5 leading-relaxed'>{enquiry.message}</p></div>
                <div className='flex flex-wrap gap-3'>
                    <a href={`mailto:${enquiry.email}?subject=${encodeURIComponent('Re: Your Vaforus enquiry')}`} className='btn-primary px-5 py-3'>Reply by email</a>
                    <button type='button' disabled={changeStatus.isLoading} onClick={() => changeStatus.mutate(!enquiry.isRead)} className='rounded-lg border border-gray-300 px-5 py-3 text-sm font-medium disabled:opacity-50'>
                        {changeStatus.isLoading ? 'Saving…' : `Mark as ${enquiry.isRead ? 'unread' : 'read'}`}
                    </button>
                </div>
                {changeStatus.isError && <p role='alert' className='text-sm text-red-600'>{returnErrorMsg(changeStatus.error)}</p>}
                {changeStatus.isSuccess && <p role='status' className='text-sm text-green-700'>Marked as {enquiry.isRead ? 'read' : 'unread'}.</p>}
            </div>
        </article>}
    </section>;
}
