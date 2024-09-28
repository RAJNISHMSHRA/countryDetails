

import React from 'react';
import { Routes, Route } from 'react-router-dom';
import CountryList from '../pages/CountryList';
import CountryDetail from '../pages/CountryDetail';
import NotFoundPage from '../pages/NotFoundPage';


const AppRoutes: React.FC = () => {
    return (
        <Routes>
            <Route path="/" element={<CountryList />} />
            <Route path="/country/:code" element={<CountryDetail />} />
            <Route path="*" element={<NotFoundPage />} />
        </Routes>
    );
};

export default AppRoutes;
