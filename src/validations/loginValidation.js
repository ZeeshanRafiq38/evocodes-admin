import * as Yup from 'yup';

const loginValidations = Yup.object({
    email: Yup.string()
    .email('Please enter valid email address')
    .required('Email is required.'),
    
    password: Yup.string()
        .min(8, 'Password should have at least 8 characters')
        .required('Password is required'),
});

export default loginValidations;