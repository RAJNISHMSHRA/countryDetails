// src/App.tsx
import React from "react";
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
