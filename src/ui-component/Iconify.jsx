import React from 'react';
import PropTypes from 'prop-types';
import { Icon } from '@iconify/react';
import Box from '@mui/material/Box';


Iconify.prototype = {
  icon: PropTypes.oneOfType([PropTypes.element, PropTypes.string]),
  sx: PropTypes.object
};
export default function Iconify({ icon, sx, ...others }) {
  return <Box component={Icon} icon={icon} sx={{ ...sx }} {...others} />;
};
