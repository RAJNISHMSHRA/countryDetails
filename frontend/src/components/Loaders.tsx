
import React from "react";
import ReactDOM from "react-dom";
import CircularProgress from '@mui/material/CircularProgress';
import { Box } from '@mui/material';

const Loaders: React.FC = () => {
  return ReactDOM.createPortal(
    <Box
      sx={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.7)', 
      }}
    >
      <CircularProgress />
    </Box>,
    document.body 
  );
};

export default Loaders;
