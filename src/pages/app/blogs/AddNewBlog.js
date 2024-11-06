import Editor from 'components/blogs/Editor';
import BackBtn from 'components/global/BackBtn'
import FormControl from 'components/global/form/FormControl';
import Heading from 'components/global/Heading'
import { Form, Formik } from 'formik';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { ClipLoader } from 'react-spinners';
import { blog_createDoc } from 'redux/actions/blogActions';
import convertToFormData from 'utils/convertToFormData';
import blogValidations from 'validations/blogValidations';

// title , content , image , meta tags , tags , slug  , author

const initValues = {
    title : '' ,
    image : '' ,
    metaTags: [] ,
    tags : [] ,
    published : true ,
    shortDescription : ''
}

const AddNewBlog = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [content, setContent] = useState('');
    const { createLoading } = useSelector(state => state.blog);

    const handleSubmit = (formData) => {
        if(!content || content?.length < 10) {
            return toast.error('Content must be at least 10 characters long.');
        }
        const body = convertToFormData({...formData , content });
        dispatch(blog_createDoc(body , navigate));
    }

    return (
        <div>
            <div className='flex items-center justify-between gap-4'>
                <div className='flex items-center gap-4'>
                    <Heading title='Create New Blog' />
                </div>
                <BackBtn />
            </div>
            <div className="mt-4 shadow-circle rounded-lg px-4">
                <Formik
                    initialValues={initValues}
                    validationSchema={blogValidations}
                    onSubmit={handleSubmit}
                >
                    {
                        (formik) => {
                            return (
                                <Form
                                    className='py-8 flex lg:flex-row flex-col gap-10'
                                >
                                    <div className='lg:flex-[0.75] flex-1 flex flex-col gap-4 '>
                                        <div className='flex gap-4 lg:flex-row flex-col'>
                                            <FormControl
                                                control='input'
                                                label='Title'
                                                placeholder='Enter blog title'
                                                name='title'
                                                formik={formik}
                                            />
                                            <FormControl
                                                control='input'
                                                label='Slug'
                                                placeholder='Enter slug'
                                                name='slug'
                                                formik={formik}
                                            />

                                        </div>
                                        <Editor
                                            content={content}
                                            setContent={setContent}
                                        />  
                                        <div className="mt-12">
                                            <FormControl
                                                control='tags'
                                                label='Tags'
                                                placeholder='Enter tags for blog'
                                                name='tags'
                                                formik={formik}
                                                limit={3}
                                            />
                                        </div>                                    
                                        <FormControl
                                            control='meta'
                                            label='Meta Tags'
                                            name='metaTags'
                                            formik={formik}
                                        />
                                    </div>
                                    <div className='lg:flex-[0.25] flex-1 flex flex-col justify-between'>
                                        <div className='flex flex-col gap-4'>
                                            <FormControl
                                                control='file'
                                                label='Cover Image'
                                                name='image'
                                                formik={formik}
                                            />
                                            <FormControl
                                                control='textarea'
                                                label='Short Description'
                                                name='shortDescription'
                                                maxLength={250}
                                                formik={formik}
                                            />
                                            <FormControl
                                                control='toggle'
                                                label='Publish'
                                                name='published'
                                                formik={formik}
                                            />

                                        </div>
                                        <div className='flex items-end justify-end'>
                                            <button 
                                            className="btn-primary py-2 px-10"
                                            disabled={createLoading || !formik.isValid}
                                            >
                                                {
                                                    createLoading 
                                                    ? 
                                                        <ClipLoader size={20} />
                                                    : 
                                                        'Submit'
                                                }
                                            </button>
                                        </div>
                                    </div>
                                </Form>
                            )
                        }
                    }
                </Formik>
                
            </div>
        </div>
    )
}

export default AddNewBlog