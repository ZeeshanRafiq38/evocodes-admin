import Axios from "config/api";
import toast from "react-hot-toast";
import { setError, setLoading, setResendLoading, setUser } from "redux/slices/authSlice";
import { storeUser } from "utils/authLocalStorage";
import { getItem, removeItem, setItem } from "utils/localStorage";
import returnErrorMsg from "utils/returnErrorMsg";
import toastError from "utils/toastError";


export const login = (data , navigate , resetForm ) => async (dispatch) => {
    dispatch(setLoading(true))
    try {
        const { data : { data : { message , doc } } } = await Axios.post('/user/login' , data );
        toast.success(message);
        dispatch(setUser({...doc}));
        storeUser(doc);
        navigate(`/app`);
        resetForm();
        dispatch(setLoading(false));
    } catch (err) {
        dispatch(setLoading(false));
        dispatch(setError({ login : returnErrorMsg(err)}))
    }
}

export const verifyOtp = (otp , navigate , resetForm)  => async (dispatch) => {
    try {
        dispatch(setLoading(true));
        const { data : { data : { message } } } = await Axios.post(`/user/verify-otp` , { otp });
        toast.success(message);
        setItem('forgot-otp' , otp)
        navigate(`/auth/reset-password`);
        resetForm();
        dispatch(setLoading(false));
    } catch (err) {
        dispatch(setLoading(false));
        dispatch(setError({ verifyOtp : returnErrorMsg(err)}))
    }
}

export const resendOtp = () => async (dispatch) => {
    dispatch(setResendLoading(true))
    try {
        const email = getItem("email");
        const { data : { data : { message } } } = await Axios.post('/user/resend-otp' , { email } );
        dispatch(setResendLoading(false));
        toast.success(message);
    } catch (err) {
        dispatch(setResendLoading(false));
        dispatch(setError({ verifyOtp : returnErrorMsg(err)}))
    }
}



export const forgotPassword = (data , navigate , resetForm) => async (dispatch) => {
    try {
        dispatch(setLoading(true));
        const { data : { data : { message } } } = await Axios.post(`/user/forgot-password` , data);
        setItem('email' , data?.email)
        toast.success(message);
        navigate('/auth/verify-otp');
        resetForm();
        dispatch(setLoading(false));
    } catch (err) {
        dispatch(setLoading(false));
        dispatch(setError({ forgotPass : returnErrorMsg(err)}))
    }
}

export const resetPassword = (data , navigate , resetForm)  => async (dispatch) => {
    const {newPassword , confirmPassword } = data;
    if(newPassword !== confirmPassword) {
        return toast.error("Oops! It looks like the passwords you provided don't match. Please ensure they are identical.")
    }
    const otp = getItem('forgot-otp')
    try {
        dispatch(setLoading(true));
        const { data : { data : { message } } } = await Axios.put('/user/reset-password' , {
            otp , newPassword , confirmPassword
        });
        toast.success(message);
        removeItem('forgot-otp')
        resetForm();
        navigate('/auth/login');
        dispatch(setLoading(false));
    } catch (err) {
        dispatch(setLoading(false));
        dispatch(setError({ resetPass : returnErrorMsg(err)}))
    }
}


export const logout = (navigate , showToast = true) => async(dispatch) => {
    dispatch(setLoading(true));
    try {
        await Axios('/user/logout');
        navigate('/auth/login');
        dispatch(setUser(null));
        removeItem('user');
        dispatch(setLoading(false));
        if(showToast){
            toast.success('Logged out successfully.')
        }
    } catch (err) {
        dispatch(setLoading(false));
        toastError(err);
    }
}

