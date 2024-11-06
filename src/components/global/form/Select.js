import { ErrorMessage, Field } from 'formik';
import ReactSelectBox from 'react-select';
import TextError from './TextError';



const ReactSelect = ( { options , field , form , meta , label } ) => {

    const customStyles = {
        container: provided => ({
            ...provided,
            width: '100%'
        }) ,
        control: (provided, state) => ({
            ...provided,
            outline: 'none',
            borderWidth: '1px',
            borderColor: meta.touched && meta.error ? 'red' : state.isFocused ? 'var(--primary)' : 'rgb(55, 65, 81)',
            backgroundColor: 'var(--dark)', 
            padding: '8px 8px',
            color: 'var(--pure)',
            transition: 'ease-in-out 200ms',
            borderRadius: '8px',
        }),
        option: (provided, { isFocused, isSelected }) => ({
            ...provided,
            background: isFocused ? 'var(--primary)' : isSelected ? 'var(--primary)' : undefined,
            zIndex: 1
        }),
        menu: (provided) => ({
            ...provided,
            width: "max-content",
            minWidth: "100%"
       }) ,
        menuList: provided => ({
            ...provided,
            backgroundColor: 'var(--secondary)',
            color: 'var(--pure)',
        }),
        singleValue: (provided, state) => ({
            ...provided,
            color: 'var(--pure)',
        }),
        input: (provided, state) => ({
            ...provided,
            color: 'var(--pure)',
        }),
        placeholder: (provided, state) => ({
            ...provided,
            color: 'var(--grayText)',
        }),
        dropdownIndicator: (provided, state) => ({
            ...provided,
            color: 'var(--pure)',
            '&:hover': {
                color: 'var(--primary)',
            }
        }),
    };

    const handleChange = e => {
        form.setFieldValue(field.name , e.value);      
    }

    const selectedOption = options.find(option => option.value === field.value);

    return (
        <div className='form-row'>
            {
                label && 
                <label>
                    {label}
                </label>
            }
            <ReactSelectBox
            options={options}
            styles={customStyles}
            classNamePrefix="react-select"
            onChange={handleChange}
            value={selectedOption}
            className='outline-none w-full'
            />
        </div>
    );
}

const Select = ({ label , name , options , ...rest }) => {
    return (
        <div className='flex-1 flex flex-col gap-2'>
            <Field name={name}>
                {
                    ({ form , meta , field }) => {
                        return (
                            <ReactSelect
                            label={label}
                            meta={meta}
                            field={field}
                            form={form}
                            options={options}
                            {...rest}
                            />
                        )
                    }
                }
           </Field>
            <ErrorMessage component={TextError} name={name} />
        </div>
    )
}

export default Select;