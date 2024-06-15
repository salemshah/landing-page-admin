import React, { useEffect, useState } from 'react';
import { Grid } from '@mui/material';
import AppImageUpload from './AppImageUpload';
import AppEditorField from './formik/AppEditorField';
import AppSubmitButton from './formik/AppSubmitButton';
import { Form, Formik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { approachInitialValues } from './formik/initialValues';
import { approachValidationSchema } from './formik/validationSchemas';
import { createApproach, updateApproach } from '../redux/actions/approachActions';

const ApproachForm = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const { approachToEdit, isEdit, approachEditId, error } = useSelector(state => state.approach);

  const [approachInitialValuesState, setApproachInitialValuesState] = useState(approachInitialValues);

  useEffect(() => {
    setApproachInitialValuesState(isEdit ? approachToEdit : approachInitialValues);
  }, [approachToEdit]);

  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    setLoading(true);
    setSubmitting(true);
    const formData = new FormData();
    formData.append('image', values.image);
    formData.append('description', values.description);

    try {
      if (isEdit && approachEditId) {
        await dispatch(updateApproach(approachEditId, formData, setLoading));
      } else {
        await dispatch(createApproach(formData, setLoading));
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
      initialValues={approachInitialValuesState}
      validationSchema={approachValidationSchema}
      onSubmit={handleSubmit}
      enableReinitialize
    >
      {() => (
        <Form autoComplete="off">
          <Grid container spacing={2}>
            <Grid item xs={12} lg={8}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <AppEditorField name="description" helper="Text descriptive de la section Approach" isEdit={isEdit} toEdit={approachToEdit} />
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12} lg={4}>
              <AppImageUpload isEdit={isEdit} toEdit={approachToEdit} />
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

export default ApproachForm;
