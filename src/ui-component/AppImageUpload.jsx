// src/components/ImageUpload.js
import React, { useState } from 'react';
import { Box, Typography, FormControl, FormHelperText } from '@mui/material';
import { useFormikContext } from 'formik';
import DeleteForeverOutlinedIcon from '@mui/icons-material/DeleteForeverOutlined';

const AppImageUpload = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [isHover, setHover] = useState(false);
  const { setFieldValue, errors, touched } = useFormikContext();

  const handleImageChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      setSelectedImage(URL.createObjectURL(file));
      setFieldValue('image', file);
    }
  };

  const handleRemoveImage = () => {
    setSelectedImage(null);
    setFieldValue('image', null);
  };


  return (
    <FormControl fullWidth error={touched.image && !!errors.image}>
      <Box
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        sx={{

          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          border: (theme) => errors.image ? `1px dashed ${theme.palette.error.main}` : '1px dashed #ccc',
          borderRadius: 1,
          p: 1,
          height: '440px',
          position: 'relative'
        }}
      >
        {selectedImage ? (
          <>
            {isHover &&
              <Box onClick={handleRemoveImage}
                   sx={{
                     backgroundColor: '#fff',
                     position: 'absolute',
                     borderRadius: '5px',
                     bottom: 10,
                     left: 10
                   }}>
                <DeleteForeverOutlinedIcon color="error" fontSize="large" />
              </Box>
            }
            <img
              src={selectedImage}
              alt="Selected"
              style={{ maxHeight: '100%', width: '100%', objectFit: 'scale-down', borderRadius: '8px' }}
            />
          </>
        ) : (
          <>
            <Typography sx={{ position: 'absolute' }}>Upload image</Typography>
            <input
              type="file"
              style={{ width: '100%', height: '100%', opacity: 0 }}
              accept="image/*"
              onChange={handleImageChange}
            />
          </>
        )}
      </Box>
      <FormHelperText>{touched.image && errors.image}</FormHelperText>
    </FormControl>
  );
};

export default AppImageUpload;
