import React from 'react';
import { FormControl, FormHelperText } from '@mui/material';
import { useFormikContext } from 'formik';
import Editor from '../editor';

const AppEditorField = ({ name, helper }) => {
  const { touched, errors, values, setFieldValue } = useFormikContext();

  return (
    <FormControl fullWidth error={touched[name] && !!errors[name]}>
      <Editor
        id={name}
        value={values[name]}
        onChange={(value) => setFieldValue(name, value)}
        error={!!errors[name] && touched[name]}
        helperText={
          !!errors[name] && touched[name] && <FormHelperText>
            {errors[name]}
          </FormHelperText>
        }
      />
      {helper && <FormHelperText>{helper}</FormHelperText>}
    </FormControl>
  );
};

export default AppEditorField;
