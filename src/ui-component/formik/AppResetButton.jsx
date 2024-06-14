import React from 'react';
import PropTypes from 'prop-types';
import { Button } from '@mui/material';
import { useFormikContext } from 'formik';
import { selectHeroToEdit } from '../../redux/actions/heroActions';
import { useDispatch } from 'react-redux';


const AppSubmitButton = ({ text = 'Reset', resetForm }) => {
  const dispatch = useDispatch();
  const handleResetForm = () => {
    dispatch(selectHeroToEdit({}));
  };

  return (
    <Button onClick={handleResetForm} fullWidth size="large" type="reset"
            variant="contained" color="inherit">
      {text}
    </Button>
  );
};

AppSubmitButton.propTypes = {
  text: PropTypes.string
};

export default AppSubmitButton;
