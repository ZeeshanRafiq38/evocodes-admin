import { lazy } from "react";
import Loadable from "components/global/Loadable";
import { Navigate } from "react-router-dom";
import PublicRoute from "./PublicRoute";
import ProtectedRoute from "./ProtectedRoute";



// LAYOUTS
const MainLayout = Loadable(lazy(() => import('layouts/main')));
const BlankLayout = Loadable(lazy(() => import('layouts/blank')));
const AuthLayout = Loadable(lazy(() => import('layouts/auth')));

// APP
const Dashboard = Loadable(lazy(() => import('pages/app/dashboard')));
const Blogs = Loadable(lazy(() => import('pages/app/blogs')));
const AddNewBlog = Loadable(lazy(() => import('pages/app/blogs/AddNewBlog')));
const EditBlog = Loadable(lazy(() => import('pages/app/blogs/EditBlog')));



// AUTH 
const Login = Loadable(lazy(() => import('pages/auth/Login')));
const ForgotPassword = Loadable(lazy(() => import('pages/auth/ForgotPassword')));
const VerifyOtp = Loadable(lazy(() => import('pages/auth/VerifyOtp')));
const ResetPassword = Loadable(lazy(() => import('pages/auth/ResetPassword')));



// 404
const NotFound = Loadable(lazy(() => import('pages/404')));


const Router = [
    {
        path : '/' ,
        element : <BlankLayout  /> ,       
        children : [
            { path : '/' , exact : true , element : <Navigate to='/auth/login' /> } ,
            { path : '*' , element : <Navigate to='/page-not-found' /> }
        ]
    } ,
    {
        path : '/auth' ,
        element : <AuthLayout  /> ,       
        children : [
            { path : '/auth/login' , exact : true , element : <PublicRoute element={<Login />} /> } ,
            { path : '/auth/forgot-password' , exact : true , element : <PublicRoute element={<ForgotPassword />} /> } ,
            { path : '/auth/verify-otp' , exact : true , element : <PublicRoute element={<VerifyOtp />} /> } ,
            { path : '/auth/reset-password' , exact : true , element : <PublicRoute element={<ResetPassword />} /> } ,
            { path : '*' , element : <Navigate to='/page-not-found' /> }
        ]
    } ,
    {
        path : '/app' ,
        element : <MainLayout /> ,
        children : [
            { path : '/app' , exact : true , element : <ProtectedRoute element={<Dashboard />} /> } ,
            { path : '/app/blogs' , exact : true , element : <ProtectedRoute element={<Blogs />} /> } ,
            { path : '/app/blogs/add' , exact : true , element : <ProtectedRoute element={<AddNewBlog />} /> } ,
            { path : '/app/blogs/edit/:slug' , exact : true , element : <ProtectedRoute element={<EditBlog />} /> } ,
            { path : '*' , element : <Navigate to='/page-not-found' /> }

        ]
    } ,
    {
        path : '/page-not-found' ,
        element : <BlankLayout /> ,
        children : [
            { path : '/page-not-found' , element : <NotFound /> }
        ]
    }

]

export default Router;