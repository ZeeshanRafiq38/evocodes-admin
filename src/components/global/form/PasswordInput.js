import EyeSlashSvg from 'assets/svgs/EyeSlashSvg'
import EyeSvg from 'assets/svgs/EyeSvg'
import { ErrorMessage, Field } from 'formik'
import React, { useState } from 'react'
import TextError from './TextError'

const PasswordInput = (props) => {
    const { label, name , formik , ...rest } = props
    const [showPassword , setShowPassword] = useState(false)

    const toggleShowPassword = () => {
        setShowPassword(!showPassword)
    }

    return (
        <div className='form-row'>
            {
                label && <label htmlFor={name}>{label}</label>
            }
            <div className='relative'>
                <Field 
                type={showPassword ? 'text' : 'password'}
                id={name} 
                name={name} 
                className={`${formik.touched[name] && formik.errors[name] ? 'border-red' : 'border-gray-700' }`}
                {...rest} 
                />
                <div className='absolute top-1/2 sm:right-3 right-2 -translate-y-1/2 text-xl w-fit cursor-pointer text-gray-500'
                onClick={toggleShowPassword}
                >
                    {
                        showPassword ? <EyeSlashSvg /> : <EyeSvg />
                    }
                </div>
            </div>
            <ErrorMessage component={TextError} name={name} />
        </div>
    )
}

export default PasswordInput