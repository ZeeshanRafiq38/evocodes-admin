import { createSlice } from '@reduxjs/toolkit';
import { getUser } from 'utils/authLocalStorage';

const errorsInitState = {
    register : '' ,
    login : '' ,
    forgotPass : '' ,
    verifyOtp : '' , 
    resetPass : ''
}

const authSlice = createSlice({
    name : 'auth' ,
    initialState : {
        user : getUser() ,
        loading : false ,
        updateLoading : false , 
        resendLoading : false , 
        errors : errorsInitState , 
        resendOtp : ''
    } ,
    reducers : {
        setUser(state , action) {
            state.user = action.payload;
        } , 
        setLoading(state , action){
            state.loading = action.payload;
        } ,
        setUpdateLoading(state , action){
            state.updateLoading = action.payload;
        } ,
        setResendLoading(state , action){
            state.resendLoading = action.payload;
        } , 
        setError (state , action) {
            state.errors = {...action.payload};
        } ,
        clearErrors (state , action) {
            state.errors = errorsInitState;
        }
    }
    
});

export const { setUser , setLoading , setUpdateLoading , setError , clearErrors , setResendLoading } = authSlice.actions;
export default authSlice.reducer;


