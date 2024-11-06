import { Form, Formik } from 'formik';
import FormControl from 'components/global/form/FormControl';
import loginValidations from 'validations/loginValidation';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { login } from 'redux/actions/authActions';
import Alert from './Alert';
import { ClipLoader } from 'react-spinners';


const initValues = {
    email: '',
    password: '',
}

const Login = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { loading , errors } = useSelector(state => state.auth);

    const handleSubmit = (formData , { resetForm }) => {
        dispatch(login(formData , navigate , resetForm))
    }

    return (
        <div className='bg-gray-50 w-full min-h-screen flex items-center justify-center '>
            <div className='bg-pure shadow-circle p-12 rounded-lg xl:w-[40%] lg:w-1/2 md:w-[75%] w-full mx-auto '>
                <div className='flex flex-col gap-2'>
                    <h3 className='md:text-3xl text-2xl font-semibold'>
                        Login
                    </h3>
                    <p className='sm:text-base text-sm text-grayText'>
                        Login to access Admin Account
                    </p>
                </div>
                <Formik
                    initialValues={initValues}
                    validationSchema={loginValidations}
                    onSubmit={handleSubmit}
                >
                    {
                        (formik) => {
                            return (
                                <Form
                                    className='mt-6 flex flex-col gap-4'
                                >
                                    {
                                        errors?.login && (
                                            <Alert message={errors?.login} />
                                        )
                                    }
                                    <FormControl
                                        control='input'
                                        label='Email'
                                        placeholder='Enter your email '
                                        name='email'
                                        formik={formik}
                                    />
                                    <FormControl
                                        control='password'
                                        label='Password'
                                        placeholder='Ex : ******** '
                                        name='password'
                                        formik={formik}
                                    />
                                    <div className='text-right'>
                                        <Link to='/auth/forgot-password'
                                            type='button'
                                            className='text-grayText underline text-sm '
                                        >
                                            Forgot Password
                                        </Link>
                                    </div>
                                    <div className='mt-6'>
                                        <button
                                            type='submit'
                                            className="btn-primary py-3 sm:px-12 px-6 w-full"
                                            disabled={loading || !formik.isValid}
                                        >
                                            {
                                                loading
                                                ?
                                                    <ClipLoader size={20} color='white'  />
                                                :
                                                    'Sign in'
                                            }
                                        </button>
                                    </div>
                                </Form>
                            )
                        }
                    }
                </Formik>
            </div>
        </div>
    )
}

export default Login