import React, { useEffect, useState } from 'react';
import { Grid } from '@mui/material';
import AppTextField from 'ui-component/formik/AppTextField';
import AppImageUpload from './AppImageUpload';
import AppEditorField from './formik/AppEditorField';
import AppSubmitButton from './formik/AppSubmitButton';
import { Form, Formik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { heroInitialValues } from './formik/initialValues';
import { heroValidationSchema } from './formik/validationSchemas';
import { createHero, updateHero } from '../redux/actions/heroActions';

const HomeForm = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const { heroToEdit, isEdit, heroEditId, error } = useSelector(state => state.hero);

  const [heroInitialValuesState, setHeroInitialValuesState] = useState(heroInitialValues);

  useEffect(() => {
    setHeroInitialValuesState(isEdit ? heroToEdit : heroInitialValues);
  }, [heroToEdit]);

  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    setLoading(true);
    setSubmitting(true);
    const formData = new FormData();
    formData.append('image', values.image);
    formData.append('heading', values.heading);
    formData.append('textAnim1', values.textAnim1);
    formData.append('textAnim2', values.textAnim2);
    formData.append('description', values.description);

    try {
      if (isEdit && heroEditId) {
        await dispatch(updateHero(heroEditId, formData, setLoading));
      } else {
        await dispatch(createHero(formData, setLoading));
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
      initialValues={heroInitialValuesState}
      validationSchema={heroValidationSchema}
      onSubmit={handleSubmit}
      enableReinitialize
    >
      {() => (
        <Form autoComplete="off">
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
                    name="textAnim1"
                    label="Titre d'animation 1"
                    helper="Texte animé 1 Dans la page d'accueil, il y a du texte animé"
                  />
                </Grid>
                <Grid item xs={12}>
                  <AppTextField
                    name="textAnim2"
                    label="Titre d'animation 2"
                    helper="Texte animé 2 Dans la page d'accueil, il y a du texte animé"
                  />
                </Grid>
                <Grid item xs={12}>
                  <AppEditorField name="description" helper="Text descriptive de la section About" isEdit={isEdit} toEdit={heroToEdit} />
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12} lg={4}>
              <AppImageUpload isEdit={isEdit} toEdit={heroToEdit} />
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

export default HomeForm;
