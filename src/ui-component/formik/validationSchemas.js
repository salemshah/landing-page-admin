import * as yup from 'yup';

const heroValidationSchema = yup.object().shape({
  heading: yup.string().required('Heading is required'),
  textAnim1: yup.string().required('Animation Text 1 is required'),
  textAnim2: yup.string().required('Animation Text 2 is required'),
  description: yup.string().required('Description is required'),
  image: yup.mixed().required('Image is required')
});

const aboutValidationSchema = yup.object().shape({
  description: yup.string().required('Description is required'),
  image: yup.mixed().required('Image is required')
});


export {
  heroValidationSchema,
  aboutValidationSchema
};