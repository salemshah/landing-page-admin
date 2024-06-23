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

const approachValidationSchema = yup.object().shape({
  description: yup.string().required('Description is required'),
  image: yup.mixed().required('Image is required')
});


const serviceValidationSchema = yup.object().shape({
  phoneNumber: yup.string()
    .required('Phone number is required')
    .matches(/^[0-9]{10}$/, 'Phone number must be 10 digits'),
  email: yup.string()
    .email('Invalid email address')
    .required('Email is required'),
  footerMessage: yup.string()
    .required('Footer message is required'),
  formHeader: yup.string()
    .required('Form header is required'),
  formDescription: yup.string()
    .required('Form description is required'),
  facebookLink: yup.string()
    .url('Invalid URL')
    .required('Facebook link is required'),
  instagramLink: yup.string()
    .url('Invalid URL')
    .required('Instagram link is required'),
  tiktokLink: yup.string()
    .url('Invalid URL')
    .required('TikTok link is required'),
  youtubeLink: yup.string()
    .url('Invalid URL')
    .required('YouTube link is required'),
  xLink: yup.string()
    .url('Invalid URL')
    .required('X link is required'),
  servicesEmails: yup.string()
    .required('Services emails are required')
    .test('is-valid-emails', 'Invalid email format', value => {
      const emails = value.split(',');
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emails.every(email => emailRegex.test(email.trim()));
    })
});



export {
  heroValidationSchema,
  aboutValidationSchema,
  approachValidationSchema,
  serviceValidationSchema
};