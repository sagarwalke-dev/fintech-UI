import React from 'react';
import { Box, CircularProgress, Typography } from '@mui/material';

/**
 * Loading screen component to display during data fetching
 * 
 * @param {Object} props - Component props
 * @param {string} [props.message="Loading..."] - Message to display
 * @param {boolean} [props.fullScreen=false] - Whether to display full screen
 */
const LoadingScreen = ({ message = 'Loading...', fullScreen = false }) => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: fullScreen ? '100vh' : '200px',
        width: '100%',
      }}
    >
      <CircularProgress size={40} thickness={4} color="primary" />
      <Typography
        variant="body1"
        color="text.secondary"
        sx={{ mt: 2 }}
      >
        {message}
      </Typography>
    </Box>
  );
};

export default LoadingScreen;