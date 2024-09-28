// src/pages/HomePage.tsx
import React from 'react';
import { Typography } from '@mui/material';
import CountryList from './CountryList';

const HomePage: React.FC = () => {
  return (
    <div>
      <Typography variant="h4" align='center'>Welcome to Country Finder</Typography>
      <CountryList />
    </div>
  );
};

export default HomePage;
