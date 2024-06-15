import React, { useEffect, useState } from 'react';
import { Grid } from '@mui/material';
import AppImageUpload from './AppImageUpload';
import AppEditorField from './formik/AppEditorField';
import AppSubmitButton from './formik/AppSubmitButton';
import { Form, Formik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { aboutInitialValues } from './formik/initialValues';
import { aboutValidationSchema } from './formik/validationSchemas';
import { createAbout, updateAbout } from '../redux/actions/aboutActions';

const AboutForm = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const { aboutToEdit, isEdit, aboutEditId, error } = useSelector(state => state.about);

  const [aboutInitialValuesState, setAboutInitialValuesState] = useState(aboutInitialValues);

  useEffect(() => {
    setAboutInitialValuesState(isEdit ? aboutToEdit : aboutInitialValues);
  }, [aboutToEdit]);

  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    setLoading(true);
    setSubmitting(true);
    const formData = new FormData();
    formData.append('image', values.image);
    formData.append('description', values.description);

    try {
      if (isEdit && aboutEditId) {
        await dispatch(updateAbout(aboutEditId, formData, setLoading));
      } else {
        await dispatch(createAbout(formData, setLoading));
      }
    } catch (error) {
      console.error('Error in form submission:', error);
    } finally {
      resetForm();
      setSubmitting(false);
    }
  };

  return (
    <Formik
      initialValues={aboutInitialValuesState}
      validationSchema={aboutValidationSchema}
      onSubmit={handleSubmit}
      enableReinitialize
    >
      {() => (
        <Form autoComplete="off">
          <Grid container spacing={2}>
            <Grid item xs={12} lg={8}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <AppEditorField name="description" helper="Text descriptive de la section About" isEdit={isEdit} toEdit={aboutToEdit} />
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12} lg={4}>
              <AppImageUpload isEdit={isEdit} toEdit={aboutToEdit} />
            </Grid>
            <Grid item xs={12}>
              <AppSubmitButton text={isEdit ? 'Modifié' : 'Créer'} loading={loading} />
            </Grid>
          </Grid>
        </Form>
      )}
    </Formik>
  );
};

export default AboutForm;
