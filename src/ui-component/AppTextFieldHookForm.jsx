import React from 'react';
import { TextField, FormControl, FormHelperText } from '@mui/material';
import { Controller, useFormContext } from 'react-hook-form';

const AppTextFieldHookForm = ({ name, label, helper, ...props }) => {
  const { control } = useFormContext();

  return (
    <FormControl fullWidth>
      <Controller
        name={name}
        control={control}
        render={({ field, fieldState: { error } }) => (
          <TextField
            {...field}
            {...props}
            label={label}
            error={!!error}
            variant="outlined"
            fullWidth
            helperText={error ? error.message : helper}
          />
        )}
      />
    </FormControl>
  );
};

export default AppTextFieldHookForm;
