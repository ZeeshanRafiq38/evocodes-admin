import BackBtn from 'components/global/BackBtn';
import FormControl from 'components/global/form/FormControl';
import { Form, Formik } from 'formik';
import * as Yup from 'yup';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import ResendOtp from './ResendOtp';
import { useDispatch, useSelector } from 'react-redux';
import { verifyOtp } from 'redux/actions/authActions';
import Alert from './Alert';
import { ClipLoader } from 'react-spinners';

const initValues = { otp: '' };

const validations = Yup.object({
    otp: Yup.string()
        .required('OTP is required')
});

const VerifyOtp = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { loading, errors } = useSelector(state => state.auth);

    const handleSubmit = (formData, { resetForm }) => {
        dispatch(verifyOtp(formData?.otp, navigate, resetForm))
    }

    return (
        <div className='bg-gray-50 w-full min-h-screen flex flex-col items-center justify-center'>
            <div>
                <div className="mb-6">
                    <BackBtn label='Back to login' url='/auth/login' />
                </div>
                <div className='bg-pure shadow-circle p-12 rounded-lg w-full mx-auto '>
                    <div className='flex flex-col gap-2'>
                        <h3 className='md:text-3xl text-2xl font-semibold'>
                            Verify code
                        </h3>
                        <p className='sm:text-base text-sm text-grayText'>
                            An authentication code has been sent to your email.
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
                                            errors?.verifyOtp && (
                                                <Alert message={errors?.verifyOtp} />
                                            )
                                        }
                                        <div className=' mt-4'>
                                            <FormControl
                                                control='otp'
                                                label='Enter OTP'
                                                name='otp'
                                                formik={formik}
                                            />
                                        </div>
                                        <div className='mt-8'>
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
                                                        'Verify'
                                                }
                                            </button>
                                        </div>
                                        <div>
                                            <ResendOtp />
                                        </div>
                                    </Form>
                                )
                            }
                        }

                    </Formik>
                </div>
            </div>
        </div>
    )
}

export default VerifyOtp