import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { resendOtp } from 'redux/actions/authActions';

const ResendOtp = () => {
    const dispatch = useDispatch();
    const { resendLoading } = useSelector(state => state.auth);
    const [disableResend, setDisableResend] = useState(true);
    const [resendTimer, setResendTimer] = useState(5);

    useEffect(() => {
        let timer;
        if (disableResend) {
            timer = setInterval(() => {
                setResendTimer(prevTimer => prevTimer - 1);
            }, 1000);
        }
        return () => clearInterval(timer);
    }, [disableResend]);

    useEffect(() => {
        if (resendTimer === 0) {
            setDisableResend(false);
            setResendTimer(5); // Reset timer to 5 seconds
        }
    }, [resendTimer]);

    const resendHandler = () => {
        dispatch(resendOtp());
        setDisableResend(true);
    }

    return (
        <div className='mt-6'>
            <div className='flex items-center gap-1 text-sm text-grayText mt-4'>
                <span>Did not get OTP? </span>
                <button
                    className="text-grayText"
                    disabled={disableResend || resendLoading} 
                    onClick={resendHandler}
                >
                    {resendLoading ? 'Sending...' : disableResend ? `Resend in ${resendTimer} seconds` : 'Resend'}
                </button>
            </div>
        </div>
    )
}

export default ResendOtp