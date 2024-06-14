import React from 'react';
import { Formik } from 'formik';

const AppFormik = ({ initialValues, validationSchema, handleSubmit, children }) => {
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
      enableReinitialize
    >
      {() => children}
    </Formik>
  );
};

export default AppFormik;