import { configureStore } from "@reduxjs/toolkit";
import appSlice from "./slices/appSlice";
import authSlice from './slices/authSlice';
import blogSlice from './slices/blogSlice';


const store = configureStore({
    reducer: {
        app : appSlice ,
        auth : authSlice ,
        blog : blogSlice
    }
});

export default store;