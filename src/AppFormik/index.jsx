import React from 'react';
import { Formik } from 'formik';

const AppFormik = ({ children, initialValues, validationSchema, handleSubmit }) => {
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {() => (children)}
    </Formik>
  );
};

export default AppFormik;