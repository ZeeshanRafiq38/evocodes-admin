import React, { useRef, useState, useEffect } from 'react';
import { Field, ErrorMessage } from 'formik';
import TextError from './TextError';
import { Tooltip } from 'react-tooltip';

const FileInput = ({ label, hint, field, form, height = '200px', formik }) => {
    const imgRef = useRef(null);
    const [preview, setPreview] = useState(null); // To store Base64 preview or URL
    const [fileData, setFileData] = useState(null); // To store File format
    const [showFullImage, setShowFullImage] = useState(false); // To handle popup

    useEffect(() => {
        // Set initial preview if an image URL is provided in initial values (for editing case)
        if (field.value && typeof field.value === 'string') {
            setPreview(field.value);
        }
    }, [field.value]);

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setFileData(file); // Save file format for form value
        form.setFieldValue(field.name, file); // Set file format to form

        // For preview (Base64)
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = () => {
            setPreview(reader.result);
        };
    };

    const removeImage = () => {
        setPreview(null);
        setFileData(null);
        form.setFieldValue(field.name, null); // Remove the file from form
    };

    return (
        <div className='w-full'>
            <div className='w-full flex-1 flex flex-col gap-2'>
                {label && (
                    <label className='flex items-center gap-2 label'>
                        {label}
                        {hint && (
                            <span
                                data-tooltip-id={field.name}
                                data-tooltip-content={hint}
                                className='text-grayText'
                            >
                                <i className="uil uil-info-circle"></i>
                                <Tooltip
                                    id={field.name}
                                    style={{ fontSize: 15, background: 'var(--primary)', width: 220 }}
                                />
                            </span>
                        )}
                    </label>
                )}
                <input
                    ref={imgRef}
                    accept='image/png, image/jpeg, image/jpg'
                    type='file'
                    onChange={handleFileChange}
                    hidden
                />
                <div
                    className={`
                    flex items-center justify-between border px-3 rounded-md cursor-pointer sm:text-base text-sm
                    ${formik.touched[field.name] && formik.errors[field.name] ? 'border-red' : null}
                    `}
                    onClick={() => imgRef?.current?.click()}
                >
                    <div>Choose File</div>
                    <div className='py-3 sm:px-6 pl-3 border-l'>Browse</div>
                </div>
            </div>
            {preview && (
                <div className='mt-4 relative border-2 border-dashed w-fit'>
                    {/* Preview image */}
                    <img
                        src={preview}
                        alt='Preview'
                        className='w-full object-cover'
                        style={{ height: height, width: '100%' }}
                        onClick={() => setShowFullImage(true)} // Show full-size image on click
                    />
                    {/* Remove icon */}
                    <span
                        className="absolute top-0 right-0 p-1 bg-red-600 text-white cursor-pointer"
                        onClick={removeImage}
                    >
                        ✖
                    </span>

                    {/* Full-size popup */}
                    {showFullImage && (
                        <div
                            className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-[999]"
                            onClick={() => setShowFullImage(false)} // Close popup on click
                        >
                            <img src={preview} alt='Full-size' className='max-h-[75vh] max-w-[90%]' />
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

const FormikFileInput = ({ label, name, height, formik, ...rest }) => (
    <div className='flex-1 flex flex-col gap-2'>
        <Field name={name}>
            {({ field, form }) => (
                <FileInput
                    label={label}
                    field={field}
                    form={form}
                    height={height ? height : '200px'}
                    formik={formik}
                    {...rest}
                />
            )}
        </Field>
        <ErrorMessage component={TextError} name={name} />
    </div>
);

export default FormikFileInput;
