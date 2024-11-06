import './styles.css';
import ReactPaginate from 'react-paginate';
import { useDispatch } from 'react-redux';
import { memo } from 'react';
import { ArrowLeft, ArrowRight } from './Arrows';

const Pagination = ({ totalPages , setCurrentPage , currentPage , pageRangeDisplayed = 2 , redux = true }) => {
    const dispatch = useDispatch();

    const handlePageClick = ({ selected }) => {
        if(redux) {
            dispatch(setCurrentPage(selected+1))
        }else {
            setCurrentPage(selected+1);
        }
    }

    return (
        <div className='shadow-circle py-3 px-4 rounded-lg mt-4 flex items-center sm:justify-between  justify-center'>
            <div className='sm:block hidden'>
                Page {currentPage} of {totalPages}
            </div>
            <ReactPaginate
            breakLabel="..."
            nextLabel={<ArrowRight />}
            onPageChange={handlePageClick}
            pageRangeDisplayed={pageRangeDisplayed}
            pageCount={totalPages}
            previousLabel={<ArrowLeft />}
            className='flex items-center gap-4 pagination'
            forcePage={currentPage-1}
            />
        </div>
    )
}

export default memo(Pagination)