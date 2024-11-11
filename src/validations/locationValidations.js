import * as Yup from 'yup';

const locationValidations = Yup.object().shape({
    name: Yup.string().required('Name is required'),
    slug: Yup.string()
        .matches(
          /^[a-z0-9]+(?:-[a-z0-9]+)*$/,
          'Slug can only contain lowercase letters, numbers, and hyphens, and cannot start or end with a hyphen'
        )
        .max(100, 'Slug cannot be more than 100 characters')
        .trim()
        .required('Slug is required'),
    officeAddress: Yup.string().required('Office Address is required'),
    mainHeading: Yup.string().required('Main heading is required'),
    mainHeadingSubText: Yup.string().required('Main heading subtext is required'),
    sectionOne: Yup.object({
        heading: Yup.string().required('Section one heading is required'),
        firstParagraph: Yup.string().required('Section one first paragraph is required'),
        secondParagraph: Yup.string(), // Optional
    }),
    sectionTwo: Yup.object({
        heading: Yup.string().required('Section two heading is required'),
        firstParagraph: Yup.string().required('Section two first paragraph is required'),
        secondParagraph: Yup.string(), // Optional
        image: Yup.string().required('Image is required'),
    }),
    faqs: Yup.array()
        .of(
            Yup.object({
                question: Yup.string().required('Question is required'),
                answer: Yup.string().required('Answer is required'),
            })
        )
        .min(1, 'At least 1 FAQs are required'),
    bottomSection: Yup.object({
        heading: Yup.string().required('Bottom section heading is required'),
        firstParagraph: Yup.string().required('Bottom section first paragraph is required'),
        secondParagraph: Yup.string(), // Optional
    }),
});

export default locationValidations;
