import Axios from 'config/api';
import toast from 'react-hot-toast';
import { setLoading , setUpdateLoading , setDocDetails , removeDoc , updateDoc , addDoc, setCreateLoading, setDeleteLoading } from 'redux/slices/blogSlice';
import toastError from 'utils/toastError';

const url = '/blog';

export const blog_createDoc = (data , navigate) => async (dispatch) => {
    dispatch(setCreateLoading(true))
    try {
        const { data : { data : { doc , message } } } = await Axios.post(url , data );
        dispatch(addDoc(doc));
        toast.success(message);
        navigate('/app/blogs')
        dispatch(setCreateLoading(false));
    } catch (err) {
        dispatch(setCreateLoading(false));
        console.log('error' , err);
        toastError(err)
    }
}


export const blog_getDetails = (slug) => async (dispatch , getState) => {
    dispatch(setLoading(true))
    try {
        const { data : { data : { doc } } } = await Axios(`${url}/slug/${slug}`);
        dispatch(setDocDetails(doc));
        dispatch(setLoading(false));
    } catch (err) {
        dispatch(setLoading(false));
        console.log('error' , err);
        toastError(err)
    }
}

export const blog_edit = (itemId , updateData , navigate) => async (dispatch , getState) => {
    dispatch(setUpdateLoading(true))
    try {
        const { data : { data : { doc , message } } } = await Axios.put(`${url}/${itemId}` , updateData );
        toast.success('Blog updated successfully.')
        dispatch(updateDoc(doc));
        navigate('/app/blogs')
        dispatch(setUpdateLoading(false));
    } catch (err) {
        dispatch(setUpdateLoading(false));
        console.log('error' , err);
        toastError(err)
    }
}

export const blog_delete = (itemId) => async (dispatch , getState) => {
    dispatch(setDeleteLoading(true))
    try {
        const { data : { data : { message } } } = await Axios.delete(`${url}/${itemId}`);
        toast.success('Blog deleted successfully.')
        dispatch(removeDoc(itemId));
        dispatch(setDeleteLoading(false));
    } catch (err) {
        dispatch(setDeleteLoading(false));
        console.log('error' , err);
        toastError(err)
    }
}

