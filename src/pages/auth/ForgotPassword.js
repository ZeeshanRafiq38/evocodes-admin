import BackBtn from 'components/global/BackBtn';
import FormControl from 'components/global/form/FormControl';
import { Form, Formik } from 'formik';
import * as Yup from 'yup';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { forgotPassword } from 'redux/actions/authActions';
import Alert from './Alert';
import { ClipLoader } from 'react-spinners';

const initValues = { email: '' };

const validations = Yup.object({
    email: Yup.string()
        .email('Invalid email address')
        .required('Email is required')
});

const ForgotPassword = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { loading , errors } = useSelector(state => state.auth);

    const handleSubmit = (formData , { resetForm }) => {
        dispatch(forgotPassword(formData , navigate , resetForm));
    }

    return (
        <div className='bg-gray-50 w-full min-h-screen flex flex-col items-center justify-center'>
            <div className="mb-6">
                <BackBtn label='Back to login' />
            </div>
            <div className='bg-pure shadow-circle p-12 rounded-lg xl:w-[40%] lg:w-1/2 md:w-[75%] w-full mx-auto '>
                <div className='flex flex-col gap-2'>
                    <h3 className='md:text-3xl text-2xl font-semibold'>
                        Forgot your password?
                    </h3>
                    <p className='sm:text-base text-sm text-grayText'>
                        Don’t worry,it happens to all of us. Enter your email below to recover your password
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
                                <Form className='mt-6 '>
                                    {
                                        errors?.forgotPass && (
                                            <Alert message={errors?.forgotPass} />
                                        )
                                    }
                                    <div className='mt-4 flex items-center justify-center'>
                                        <FormControl
                                            control='input'
                                            label='Email'
                                            placeholder='example@gmail.com'
                                            name='email'
                                            formik={formik}
                                        />
                                    </div>
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
                                                    'Send OTP'
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

export default ForgotPassword