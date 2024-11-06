import { debounce } from 'lodash';
import { memo } from 'react';


const Search = ({ fetcher , timeout = 500 , placeholder = 'Search here...' , label = '' , style}) => {

    const handleInputChange = debounce((event) => {
        const value = event.target.value;
        fetcher(value);
    }, timeout );


    return (
        <div className='flex flex-col gap-2 flex-1 w-full'>
            {
                label && 
                <label className='font-semibold text-pure '>
                    {label} 
                </label>
            }
            <div 
            className={`
                box-shadow p-4 border border-gray-700 rounded-md flex items-center gap-4 focus-within:border-primary
                ${style}
            `}>
                <i className="uil uil-search"></i>
                <input 
                type="text" 
                placeholder={placeholder} 
                className='outline-none border-none bg-transparent flex-1'
                onChange={handleInputChange}
                />
            </div>
        </div>
    )
}

export default memo(Search)