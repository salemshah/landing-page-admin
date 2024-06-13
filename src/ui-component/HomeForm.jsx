// src/App.js
import React from 'react';
import { Button, Grid } from '@mui/material';
import { Form, Formik } from 'formik';
import * as yup from 'yup';
import axiosInstance from 'api/axiosInstance';
import AppTextField from 'ui-component/formik/AppTextField';
import AppImageUpload from './AppImageUpload';
import AppEditorField from './formik/AppEditorField';

// Validation schema
const validationSchema = yup.object().shape({
  heading: yup.string().required('Heading is required'),
  animText1: yup.string().required('Animation Text 1 is required'),
  animText2: yup.string().required('Animation Text 2 is required'),
  description: yup.string().required('Description is required'),
  image: yup.mixed().required('Image is required')
});

const App = () => {
  const initialValues = {
    heading: '',
    animText1: '',
    animText2: '',
    description: '',
    image: null
  };

  const handleSubmit = async (values) => {
    const formData = new FormData();
    console.log(values);
    return

    formData.append('image', values.image);
    formData.append('heading', values.heading);
    formData.append('typingText', JSON.stringify([values.animText1, values.animText2]));
    formData.append('description', values.description);

    try {
      const res = await axiosInstance.post('/hero', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      console.log(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      <Form noValidate autoComplete="off">
        <Grid container spacing={2}>
          <Grid item xs={12} lg={8}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <AppTextField
                  name="heading"
                  label="Titre d'accueil"
                  helper="Le gros titre qui s'affiche dans la section accueil"
                />
              </Grid>
              <Grid item xs={12}>
                <AppTextField
                  name="animText1"
                  label="Titre d'animation 1"
                  helper="Texte animé 1 Dans la page d'accueil, il y a du texte animé"
                />
              </Grid>
              <Grid item xs={12}>
                <AppTextField
                  name="animText2"
                  label="Titre d'animation 2"
                  helper="Texte animé 2 Dans la page d'accueil, il y a du texte animé"
                />
              </Grid>
              <Grid item xs={12}>
                <AppEditorField name="description" helper="Text descriptive de page d'accueil" />
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12} lg={4}>
            <AppImageUpload />
          </Grid>
          <Grid item xs={12}>
            <Button type="submit" variant="contained" color="primary" fullWidth>
              Submit
            </Button>
          </Grid>
        </Grid>
      </Form>
    </Formik>
  );
};

export default App;
