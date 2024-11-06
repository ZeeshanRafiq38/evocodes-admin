import BackBtn from 'components/global/BackBtn';
import FormControl from 'components/global/form/FormControl';
import { Form, Formik } from 'formik';
import * as Yup from 'yup';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { resetPassword } from 'redux/actions/authActions';
import Alert from './Alert';
import { ClipLoader } from 'react-spinners';


const initValues = { 
    newPassword : '' , 
    confirmPassword : ''
}

const validations = Yup.object({
    newPassword: Yup.string()
        .min(8, 'Password should have at least 8 characters')
        .matches(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
            'Password must include at least one uppercase letter, one lowercase letter, one number, and one special character'
        )
        .required('New Password is required'),

    confirmPassword: Yup.string()
        .oneOf([Yup.ref('newPassword'), null], 'Passwords must match')
        .required('Confirm password is required'),
})

const ResetPassword = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { loading , errors } = useSelector(state => state.auth)

    const handleSubmit = (formData , { resetForm }) => {
        dispatch(resetPassword(formData , navigate , resetForm ))
    }

    return (
        <div className='bg-gray-50 w-full min-h-screen flex flex-col items-center justify-center'>
            <div className="mb-6">
                <BackBtn label='Back to login' url={'/auth/login'} />
            </div>
            <div className='bg-pure shadow-circle p-12 rounded-lg xl:w-[40%] lg:w-1/2 md:w-[75%] w-full mx-auto '>
                <div className='flex flex-col gap-2'>
                    <h3 className='md:text-3xl text-2xl font-semibold'>
                        Set New password
                    </h3>
                    <p className='sm:text-base text-sm text-grayText'>
                        Your previous password has been reseted. Please set a new password for your account.
                    </p>
                </div>
                <Formik
                    initialValues={initValues}
                    validationSchema={validations}
                    onSubmit={handleSubmit}
                >
                    {
                        (formik) => {
                            return (
                                <Form className='flex flex-col gap-4'>
                                    {
                                        errors?.resetPass && (
                                            <Alert message={errors?.resetPass} />
                                        )
                                    }
                                    <div className="mt-4"></div>
                                    <FormControl
                                    control='password'
                                    label='New Password'
                                    placeholder='Ex : **************'
                                    name='newPassword'
                                    formik={formik}
                                    />
                                    <FormControl
                                    control='password'
                                    label='Confirm Password'
                                    placeholder='Ex : **************'
                                    name='confirmPassword'
                                    formik={formik}
                                    />
                                    <center className='mt-8'>
                                        <button
                                            className="btn-primary py-2 sm:px-12 px-6"
                                            disabled={loading || !formik.isValid}
                                            type='submit'
                                        >
                                            {
                                                loading
                                                ?
                                                    <ClipLoader size={20} color='white' />
                                                :
                                                    'Change Password'
                                            }
                                        </button>
                                    </center>
                                </Form>
                            )
                        }
                    }

                </Formik>
            </div>
        </div>
    )
}

export default ResetPassword