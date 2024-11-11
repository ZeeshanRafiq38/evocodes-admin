import BackBtn from 'components/global/BackBtn'
import FormControl from 'components/global/form/FormControl'
import Heading from 'components/global/Heading'
import { Form, Formik } from 'formik'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { ClipLoader } from 'react-spinners'
import { location_edit } from 'redux/actions/locationActions'
import locationValidations from 'validations/locationValidations'
import { serialize } from 'object-to-formdata';
import Axios, { baseURL } from 'config/api'
import { useQuery } from 'react-query'
import { setDocDetails } from 'redux/slices/locationSlice'
import Loader from 'components/global/Loader'
import DisplayError from 'components/global/DisplayError'
import returnErrorMsg from 'utils/returnErrorMsg'
import ItemNotFound from 'components/global/ItemNotFound'





const EditLocation = () => {
    const { slug } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { updateLoading , docDetails } = useSelector(state => state.location);

    const initValues = {
        name : docDetails?.name || '' ,
        officeAddress : docDetails?.officeAddress || '' ,
        slug : docDetails?.slug || '' ,
        mainHeading : docDetails?.mainHeading || '' ,
        mainHeadingSubText : docDetails?.mainHeadingSubText || '' ,
        sectionOne : {
            heading : docDetails?.sectionOne?.heading || '' ,
            firstParagraph : docDetails?.sectionOne?.firstParagraph || '' ,
            secondParagraph : docDetails?.sectionOne?.secondParagraph || ''
        } ,
        sectionTwo : {
            heading : docDetails?.sectionTwo?.heading || '' ,
            firstParagraph : docDetails?.sectionTwo?.firstParagraph || '' ,
            secondParagraph : docDetails?.sectionTwo?.secondParagraph || '' ,
            image : baseURL + '/' + docDetails?.sectionTwo?.image || ''
        } ,
        faqs : docDetails?.faqs || [] ,
        bottomSection : {
            heading : docDetails?.bottomSection?.heading || '' ,
            firstParagraph : docDetails?.bottomSection?.firstParagraph || '' ,
            secondParagraph : docDetails?.bottomSection?.secondParagraph || '' ,
        }
    }

    const queryKey = ['fetch-location-details' , slug];
    const { isLoading , isError , error } = useQuery(queryKey , () => {
        return Axios(`/location/slug/${slug}`);
    } , { 
        refetchOnWindowFocus : false ,
        staleTime : 0 ,
        cacheTime: 0 ,
        onSuccess : (data) => {
            const { data : { data : { doc } } } = data;
            dispatch(setDocDetails(doc))
        }
    });


    const submitHandler = async (formData , { reset } ) => {
        const options = {
            indices : true ,
            dotsForObjectNotation : true ,
        }

        if (formData?.sectionTwo?.image === baseURL + "/" + docDetails?.sectionTwo?.image) {
            formData.sectionTwo.image = docDetails?.sectionTwo?.image;
        }

        const body = serialize(formData , options);
        dispatch(location_edit(docDetails?._id , body , navigate))
    }

    return (
        <div>
            <div className='flex items-center justify-between gap-4'>
                <div className='flex items-center gap-4'>
                    <Heading title='Update Location' />
                </div>
                <BackBtn />
            </div>
            {
                isLoading
                ? 
                    <Loader />
                : 
                isError
                ? 
                    <DisplayError message={returnErrorMsg(error)} />
                : 
                docDetails
                ? 
                    <div className="mt-4 ">
                        <Formik
                        initialValues={initValues}
                        validationSchema={locationValidations}
                        onSubmit={submitHandler}
                        >
                            {
                                (formik) => {
                                    return (
                                        (
                                            <Form className='flex flex-col gap-4'>
                                                <div className='shadow-circle rounded-lg p-4 flex flex-col gap-4'>
                                                    <div className='flex gap-4 lg:flex-row flex-col'>
                                                        <FormControl
                                                            control='input'
                                                            label='Location Name'
                                                            placeholder='Enter Location Name'
                                                            name='name'
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
                                                    <div className='flex gap-4 lg:flex-row flex-col'>
                                                        <FormControl
                                                            control='input'
                                                            label='Page Heading'
                                                            placeholder='Enter main heading of the page'
                                                            name='mainHeading'
                                                            formik={formik}
                                                        />
                                                        <FormControl
                                                            control='input'
                                                            label='Heading Sub text'
                                                            placeholder='Enter sub text apears below heading'
                                                            name='mainHeadingSubText'
                                                            formik={formik}
                                                        />
        
                                                    </div>
                                                    <div>
                                                        <FormControl
                                                            control='input'
                                                            label='Office Address'
                                                            placeholder='Enter office address'
                                                            name='officeAddress'
                                                            formik={formik}
                                                        />
                                                    </div>
                                                </div>
                                                <div>
                                                    <h3 className='text-xl font-semibold'>
                                                        Section 1
                                                    </h3>
                                                    <div className='mt-2 shadow-circle rounded-lg p-4 flex flex-col gap-4'>
                                                        <FormControl
                                                            control='input'
                                                            label='Main Heading'
                                                            placeholder='Enter section one heading'
                                                            name='sectionOne.heading'
                                                            formik={formik}
                                                        />
                                                        <div className='flex gap-4 lg:flex-row flex-col'>
                                                            <FormControl
                                                                control='textarea'
                                                                label='Paragraph One'
                                                                placeholder='Enter first paragraph of section 1'
                                                                name='sectionOne.firstParagraph'
                                                                formik={formik}
                                                            />
                                                            <FormControl
                                                                control='textarea'
                                                                label='Paragraph Two'
                                                                placeholder='Enter second paragraph of section 1'
                                                                name='sectionOne.secondParagraph'
                                                                formik={formik}
                                                            />
                                                        </div>
        
                                                    </div>
                                                </div>
                                                <div>
                                                    <h3 className='text-xl font-semibold'>
                                                        Section 2
                                                    </h3>
                                                    <div className='mt-2 shadow-circle rounded-lg p-4 flex flex-col gap-4'>
                                                        <FormControl
                                                            control='input'
                                                            label='Main Heading'
                                                            placeholder='Enter section two heading'
                                                            name='sectionTwo.heading'
                                                            formik={formik}
                                                        />
                                                        <div className='flex gap-4 lg:flex-row flex-col'>
                                                            <FormControl
                                                                control='textarea'
                                                                label='Paragraph One'
                                                                placeholder='Enter first paragraph of section 2'
                                                                name='sectionTwo.firstParagraph'
                                                                formik={formik}
                                                            />
                                                            <FormControl
                                                                control='textarea'
                                                                label='Paragraph Two'
                                                                placeholder='Enter second paragraph of section 2'
                                                                name='sectionTwo.secondParagraph'
                                                                formik={formik}
                                                            />
                                                        </div>
                                                        <FormControl
                                                            control='file'
                                                            label='Image'
                                                            name='sectionTwo.image'
                                                            formik={formik}
                                                        />
        
                                                    </div>
                                                </div>
                                                <div>
                                                    <h3 className='text-xl font-semibold'>
                                                        FAQs
                                                    </h3>
                                                    <div className='mt-2 shadow-circle rounded-lg p-4 flex flex-col gap-4'>
                                                        <FormControl
                                                            control='faq'
                                                            name='faqs'
                                                            formik={formik}
                                                        />
                                                    </div>
                                                </div>
        
                                                <div>
                                                    <h3 className='text-xl font-semibold'>
                                                        Bottom Section
                                                    </h3>
                                                    <div className='mt-2 shadow-circle rounded-lg p-4 flex flex-col gap-4'>
                                                        <FormControl
                                                            control='input'
                                                            label='Main Heading'
                                                            placeholder='Enter section one heading'
                                                            name='bottomSection.heading'
                                                            formik={formik}
                                                        />
                                                        <div className='flex gap-4 lg:flex-row flex-col'>
                                                            <FormControl
                                                                control='textarea'
                                                                label='Paragraph One'
                                                                placeholder='Enter first paragraph of bottom section'
                                                                name='bottomSection.firstParagraph'
                                                                formik={formik}
                                                            />
                                                            <FormControl
                                                                control='textarea'
                                                                label='Paragraph Two'
                                                                placeholder='Enter second paragraph of bottom section'
                                                                name='bottomSection.secondParagraph'
                                                                formik={formik}
                                                            />
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="mt-6 flex items-end justify-end">
                                                    <button 
                                                    className="btn-primary py-3 px-6"
                                                    type='submit'
                                                    disabled={updateLoading || !formik.isValid}
                                                    >
                                                        {
                                                            updateLoading 
                                                            ? 
                                                                <ClipLoader size={20} color='white' />
                                                            : 
                                                                'Update'
                                                        }
                                                    </button>
                                                </div>
                                            </Form>
                                        )
                                    )
                                }
                            }
                        </Formik>
                    </div>
                : 
                    <ItemNotFound message='Details not found.' />
            }
        </div>
    )
}

export default EditLocation