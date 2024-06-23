import React from 'react';
import { TextField, FormControl, FormHelperText } from '@mui/material';
import { useField, useFormikContext } from 'formik';

const AppTextField = ({ name, label, helper, ...props }) => {
  const [field, meta] = useField(name);
  const { errors, touched } = useFormikContext();

  return (
    <FormControl fullWidth error={touched[name] && !!errors[name]}>
      <TextField
        {...field}
        {...props}
        label={label}
        error={!!errors[name] && touched[name]}
        variant="outlined"
        fullWidth
      />
      {helper && <FormHelperText>{helper}</FormHelperText>}
    </FormControl>
  );
};

export default AppTextField;
