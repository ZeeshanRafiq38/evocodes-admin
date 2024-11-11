import { configureStore } from "@reduxjs/toolkit";
import appSlice from "./slices/appSlice";
import authSlice from './slices/authSlice';
import blogSlice from './slices/blogSlice';
import locationSlice from './slices/locationSlice';


const store = configureStore({
    reducer: {
        app : appSlice ,
        auth : authSlice ,
        blog : blogSlice ,
        location : locationSlice
    }
});

export default store;