import React from 'react';
import PropTypes from 'prop-types';
import { Button, CircularProgress } from '@mui/material';
import { useFormikContext } from 'formik';

const AppSubmitButton = ({ text = 'Envoyer', loading }) => {
  const { isSubmitting, submitForm } = useFormikContext();
  return (
    <Button disabled={isSubmitting || loading} onClick={submitForm} fullWidth size="large" type="button"
            variant="contained" color="secondary">
      {isSubmitting || loading ? <CircularProgress size={24} /> : text}
    </Button>
  );
};

AppSubmitButton.propTypes = {
  text: PropTypes.string
};

export default AppSubmitButton;
