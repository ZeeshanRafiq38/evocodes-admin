import { createSlice } from "@reduxjs/toolkit";

const blogSlice = createSlice({
    name : 'blog' ,
    initialState : {
        docs : [] ,
        docDetails : null ,
        loading : false , 
        createLoading : false , 
        updateLoading : false , 
        deleteLoading : false ,
        currentPage : 1 ,
        pages : 1 , 
        docsCount : 0 , 
        keyword : '' ,
        status : '' ,
        sort : 'latest'
    } , 
    reducers : {
        setStats (state , action) {
            const { docs , docsCount , page , pages } = action.payload;
            state.docs = docs;
            state.docsCount = docsCount;
            state.currentPage = page;
            state.pages = pages;
        } ,
        setDocDetails (state , action) {
            state.docDetails = action.payload
        } ,
        addDoc (state , action) {
            state.docs = [action.payload, ...state.docs];
        } ,
        updateDoc (state , action) {
            const index = state.docs.findIndex(i => i._id === action.payload._id);
            state.docs[index] = action.payload;
            state.docDetails = action.payload;
        } ,
        removeDoc (state , action) {
            state.docs = state.docs.filter(i => i._id !== action.payload);
        } , 
        setLoading (state , action) {
            state.loading = action.payload;
        } ,
        setUpdateLoading (state , action ) {
            state.updateLoading = action.payload
        } ,
        setCreateLoading (state , action ) {
            state.createLoading = action.payload
        } ,
        setDeleteLoading (state , action ) {
            state.deleteLoading = action.payload
        } ,
        setCurrentPage (state , action) {
            state.currentPage = action.payload;
        } ,
        setKeyword (state , action) {
            state.keyword = action.payload;
        } , 
        setSort (state , action) {
            state.sort = action.payload;
        } ,
    }
});

export const { 
     setStats , setDocDetails , setLoading , setCreateLoading , setUpdateLoading , setDeleteLoading , setCurrentPage , updateDoc , removeDoc , addDoc , setKeyword , setSort
} = blogSlice.actions;

export default blogSlice.reducer;