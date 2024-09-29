// src/App.tsx
import React from "react";
import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import CountryDetail from "./pages/CountryDetail";
import Layout from "./Layout/Layout";
import AppRoutes from "./routes/AppRoutes";

const App: React.FC = () => {
  return (
    <Layout>
      <AppRoutes />
    </Layout>
  );
};

export default App;
