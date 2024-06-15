import React, { useEffect, useState } from 'react';
import { Box, Typography, FormControl, FormHelperText } from '@mui/material';
import { useFormikContext } from 'formik';
import DeleteForeverOutlinedIcon from '@mui/icons-material/DeleteForeverOutlined';

const AppImageUpload = ({ isEdit, toEdit }) => {

  const [selectedImage, setSelectedImage] = useState(null);
  const [isHover, setHover] = useState(false);
  const { setFieldValue, errors, touched } = useFormikContext();

  const handleImageChange = async (event) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      setSelectedImage(URL.createObjectURL(file));
      setFieldValue('image', file);
    }
  };

  useEffect(() => {
    if (isEdit) {
      setSelectedImage(toEdit?.image);
      setFieldValue('image', toEdit?.image);
    } else {
      setSelectedImage(null);
      setFieldValue('image', null);
    }
  }, [toEdit, isEdit]);

  const handleRemoveImage = () => {
    setSelectedImage(null);
    setFieldValue('image', null);
  };


  return (
    <label id="image">
      <FormControl sx={{
        height: 'calc(100% - 1.5rem)',
        border: (theme) => errors.image && touched['image'] ? `1px solid ${theme.palette.error.main}` : '1px solid #ccc',
        borderRadius: 2.5,
        p: 2
      }} fullWidth
                   error={touched.image && !!errors.image}>
        <Box
          onMouseEnter={() => setHover(true)}
          onMouseLeave={() => setHover(false)}
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            border: (theme) => `2px dashed ${theme.palette.primary.main}`,
            borderRadius: 1,
            p: 1,
            height: '100%',
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
                id="image"
                style={{ width: '100%', height: '100%', opacity: 0 }}
                accept="image/*"
                onChange={handleImageChange}
              />
            </>
          )}
        </Box>
      </FormControl>
      <FormHelperText>{touched.image && errors.image}</FormHelperText>
    </label>
  );
};

export default AppImageUpload;
