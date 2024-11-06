import * as Yup from 'yup';

const blogValidations = Yup.object().shape({
    title: Yup.string()
        .max(100, 'Title cannot be more than 100 characters')
        .trim()
        .required('Title is required'),
    slug: Yup.string()
        .matches(
          /^[a-z0-9]+(?:-[a-z0-9]+)*$/,
          'Slug can only contain lowercase letters, numbers, and hyphens, and cannot start or end with a hyphen'
        )
        .max(100, 'Slug cannot be more than 100 characters')
        .trim()
        .required('Slug is required'),
      
    image: Yup.string()
        .required('Image is required'),
    tags: Yup.array()
        .of(Yup.string().required('Each tag is required'))
        .required('Tags are required')
        .min(1, 'At least one tag is required')
        .max(3, 'A blog post can have up to 3 tags') ,
    shortDescription: Yup.string()
        .trim()
        .required('Short description is required'),
});

export default blogValidations;
