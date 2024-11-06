import React, { useState } from 'react';
import { Field, ErrorMessage } from 'formik';
import TextError from './TextError';

function Textarea(props) {
    const { label, name, maxLength, formik, ...rest } = props;
    const [charCount, setCharCount] = useState(0);
    const [error, setError] = useState('');

    const handleChange = (e) => {
        const value = e.target.value;
        setCharCount(value.length);
        if (maxLength && value.length >= maxLength) {
            setError(`Reached maximum length of ${maxLength} characters.`);
        } else {
            setError('');
        }
        formik.setFieldValue(name, value);
    };

    return (
        <div className="form-row">
            {label && <label htmlFor={name}>{label}</label>}
            <Field
                as="textarea"
                id={name}
                name={name}
                maxLength={maxLength}
                {...rest}
                onChange={handleChange}
                className={`${formik.touched[name] && formik.errors[name] ? 'border-red' : ''} resize-none h-[120px]`}
            />
            <div className="text-right text-sm text-gray-300 mt-1">
                {charCount}{ maxLength && `/${maxLength}`}
            </div>
            {error && <div className="text-red-500 text-sm mt-1">{error}</div>}
            <ErrorMessage component={TextError} name={name} />
        </div>
    );
}

export default Textarea;
