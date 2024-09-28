// src/components/Layout.tsx
import React from 'react';
import { AppBar, Toolbar, Typography, Container } from '@mui/material';
import { Link } from 'react-router-dom';

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component={Link} to="/" style={{ textDecoration: 'none', color: 'white' }}>
            Country Finder
          </Typography>
          {/* Add more navigation items if needed */}
          <nav>
            <Link to="/" style={{ marginLeft: '15px', textDecoration: 'none', color: 'white' }}>Home</Link>
            <Link to="/about" style={{ marginLeft: '15px', textDecoration: 'none', color: 'white' }}>About</Link>
          </nav>
        </Toolbar>
      </AppBar>
      
      <Container maxWidth="lg" style={{ marginTop: '20px' }}>
        {children}
      </Container>

      <footer style={{ marginTop: '20px', padding: '10px', textAlign: 'center', backgroundColor: '#f1f1f1' }}>
        <Typography variant="body1">© 2024 Country Finder</Typography>
      </footer>
    </div>
  );
};

export default Layout;
