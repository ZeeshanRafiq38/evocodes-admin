import React from 'react'
import { Field, ErrorMessage } from 'formik'
import TextError from './TextError'
import { Tooltip } from 'react-tooltip'

function Input (props) {
    const { label , hint , name , formik , ...rest } = props
    return (
        <div className='form-row'>
            {
                label 
                ?
                    <label htmlFor={name}>
                        {label}
                        {
                            hint && (
                                <span
                                data-tooltip-id={name}
                                data-tooltip-content={hint}
                                className='text-grayText'
                                >
                                    <i className="uil uil-info-circle"></i>
                                    <Tooltip 
                                    id={name}
                                    style={{ fontSize : 15 , background : 'var(--primary)' }} 
                                    />
                                </span>
                            )
                        }
                    </label>
                : ''
            }
            <Field 
            id={name} 
            name={name} 
            className={`${formik.touched[name] && formik.errors[name] ? 'border-red' : 'border-gray-700' }`}
            {...rest} 
            />
            <ErrorMessage component={TextError} name={name} />
        </div>
    )
}

export default Input;
