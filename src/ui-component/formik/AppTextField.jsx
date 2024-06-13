// src/components/AppTextField.js
import React from 'react';
import { TextField, FormControl, FormHelperText } from '@mui/material';
import { useField, useFormikContext } from 'formik';

const AppTextField = ({ name, label, helper, ...props }) => {
  const [field, meta] = useField(name);
  const { errors } = useFormikContext();

  return (
    <FormControl fullWidth error={meta.touched && !!meta.error}>
      <TextField
        {...field}
        {...props}
        label={label}
        error={!!errors[name]}
        variant="outlined"
        fullWidth
      />
      <FormHelperText>{meta.touched && meta.error}</FormHelperText>
      {helper && <FormHelperText>{helper}</FormHelperText>}
    </FormControl>
  );
};

export default AppTextField;
