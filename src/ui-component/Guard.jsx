// src/FullPageLoader.js
import React, { useEffect, useState } from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import axios from 'axios';
import axiosInstance from '../api/axiosInstance';

const Guard = ({ children }) => {

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    axiosInstance.post('/auth/check-token').then().catch(console.error).finally(() => {
      setIsLoading(false);
    });
  }, []);

  return (
    <>
      {isLoading ? (<Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100vh',
            width: '100vw',
            position: 'fixed',
            top: 0,
            left: 0,
            backgroundColor: '#fff',
            zIndex: 9999
          }}
        >
          <CircularProgress />
        </Box>)
        : (children)
      }
    </>
  );
};

export default Guard;
