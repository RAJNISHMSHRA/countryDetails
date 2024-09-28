import React from 'react';
import { Routes, Route } from 'react-router-dom';
import CountryList from '../pages/CountryList';
import CountryDetail from '../pages/CountryDetail';
import NotFoundPage from '../pages/NotFoundPage';
import AboutComponent from '../pages/AboutPage';

const AppRoutes: React.FC = () => {
    return (
        <Routes>
            <Route path="/" element={<CountryList />} /> {/* Home Page */}
            <Route path="/country/:code" element={<CountryDetail />} /> {/* Country Detail Page */}
            <Route path="/about" element={<AboutComponent />} /> {/* About Page */}
            <Route path="*" element={<NotFoundPage />} /> {/* 404 Not Found */}
        </Routes>
    );
};

export default AppRoutes;
