import BackBtn from 'components/global/BackBtn'
import FormControl from 'components/global/form/FormControl'
import Heading from 'components/global/Heading'
import { Form, Formik } from 'formik'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { ClipLoader } from 'react-spinners'
import { location_createDoc } from 'redux/actions/locationActions'
import convertToFormData from 'utils/convertToFormData'
import locationValidations from 'validations/locationValidations'
import { serialize } from 'object-to-formdata';


const initValues = {
    name : '' ,
    slug : '' ,
    officeAddress : '' ,
    mainHeading : '' ,
    mainHeadingSubText : '' ,
    sectionOne : {
        heading : '' ,
        firstParagraph : '' ,
        secondParagraph : ''
    } ,
    sectionTwo : {
        heading : '' ,
        firstParagraph : '' ,
        secondParagraph : '' ,
        image : ''
    } ,
    faqs : [] ,
    bottomSection : {
        heading : '' ,
        firstParagraph : '' ,
        secondParagraph : '' ,
    }
}


const AddLocation = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { createLoading } = useSelector(state => state.location);

    const submitHandler = async (formData , { reset } ) => {
        const options = {
            indices : true ,
            dotsForObjectNotation : true ,
        }
        const body = serialize(formData , options);
        dispatch(location_createDoc(body , navigate))
    }

    return (
        <div>
            <div className='flex items-center justify-between gap-4'>
                <div className='flex items-center gap-4'>
                    <Heading title='New Location' />
                </div>
                <BackBtn />
            </div>
            <div className="mt-4 ">
                <Formik
                initialValues={initValues}
                validationSchema={locationValidations}
                onSubmit={submitHandler}
                >
                    {
                        (formik) => (
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
                                    disabled={createLoading || !formik.isValid}
                                    >
                                        {
                                            createLoading 
                                            ? 
                                                <ClipLoader size={20} color='white' />
                                            : 
                                                'Submit'
                                        }
                                    </button>
                                </div>
                            </Form>
                        )
                    }
                </Formik>
            </div>
        </div>
    )
}

export default AddLocation