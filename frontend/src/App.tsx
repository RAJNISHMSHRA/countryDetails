// src/App.tsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import CountryDetail from './pages/CountryDetail';
import Layout from './Layout/Layout';

const App: React.FC = () => {
  return (
    
      <Layout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/country/:code" element={<CountryDetail />} />
        </Routes>
      </Layout>

  );
};

export default App;
