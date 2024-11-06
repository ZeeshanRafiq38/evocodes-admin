import React from 'react'
import DateView from 'react-datepicker'
import { Field, ErrorMessage } from 'formik'
import TextError from './TextError'
import 'react-datepicker/dist/react-datepicker.css'

function DatePicker (props) {
    const { label, name, ...rest } = props
    return (
        <div className='form-row'>
            <label htmlFor={name}>{label}</label>
            <Field name={name} >
                {({ form , field , meta }) => {
                    const { setFieldValue } = form
                    const { value } = field
                    return (
                        <div className={`w-full ${meta.touched && meta.error ? 'border-red rounded-lg' : 'border-gray-700'}`}>
                            <DateView
                                id={name}
                                {...field}
                                {...rest}
                                selected={value}
                                onChange={val => setFieldValue(name, val)}
                                className='w-full'
                            />
                        </div>
                    )
                }}
            </Field>
            <ErrorMessage component={TextError} name={name} />
        </div>
    )
}

export default DatePicker
