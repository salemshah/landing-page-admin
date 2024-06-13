import React, { useState } from 'react';
import { Box, Typography } from '@mui/material';
import DeleteForeverOutlinedIcon from '@mui/icons-material/DeleteForeverOutlined';

const UploadImageComponent = () => {

  const [selectedImage, setSelectedImage] = useState(null);
  const [isHover, setHover] = useState(false);
  const handleImageChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      setSelectedImage(URL.createObjectURL(event.target.files[0]));
    }
  };

  const handleRemoveImage = () => {
    setSelectedImage(null);
  };

  return (
    <>
      <Box
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          border: '1px dashed #ccc',
          borderRadius: 1,
          p: 1,
          height: '100%',
          maxHeight: '440px',
          position: 'relative'
        }}
      >
        {selectedImage ? (
          <>
            {isHover &&
              <Box onClick={handleRemoveImage}
                   sx={{ backgroundColor: '#fff', position: 'absolute', borderRadius: '5px', bottom: 10, left: 10 }}>
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
    </>
  );
};

export default UploadImageComponent;