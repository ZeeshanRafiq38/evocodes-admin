import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Outlet, useLocation } from "react-router-dom";
import { setError } from "redux/slices/authSlice";

const AuthLayout = () => {
    const location = useLocation();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(setError({}))
    } , [location.pathname])

    return (
        <>
            <Outlet />
        </>
    );
}

export default AuthLayout;
