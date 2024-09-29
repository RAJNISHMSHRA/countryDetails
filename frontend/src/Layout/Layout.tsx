import React from 'react';
import { AppBar, Toolbar, Typography, Container, Box } from '@mui/material';
import { Link } from 'react-router-dom';
import styled from 'styled-components';


const StyledAppBar = styled(AppBar)`
  background-color: #1976d2;
  position: static;
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  color: white;
  margin-left: 15px;
  &:hover {
    color: #ffeb3b; // Hover effect
  }
`;

const MainContainer = styled(Container)`
  flex: 1;
  margin-top: 20px;
  padding: 0 16px; // Add padding for small screens

  @media (max-width: 768px) {
    padding-left: 16px;
    padding-right: 16px;
  }
`;

const Footer = styled(Box)`
  padding: 10px;
  text-align: center;
  background-color: #f1f1f1;
  position: fixed;
  bottom: 0;
  width: 100%;

  @media (max-width: 768px) {
    padding: 15px;
  }
`;

const LayoutWrapper = styled(Box)`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background-color: #f7f7f7;
`;

// Layout Component
const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <LayoutWrapper>
      {/* Fixed Top Navbar */}
      <StyledAppBar>
        <Toolbar>
          <Typography variant="h6" component={Link} to="/" style={{ textDecoration: 'none', color: 'white' }}>
            Country Finder
          </Typography>
          {/* Navigation items with hover effect */}
          <nav>
            <StyledLink to="/">Home</StyledLink>
            <StyledLink to="/charts">Charts</StyledLink>
          </nav>
        </Toolbar>
      </StyledAppBar>

      {/* Main Content Area */}
      <MainContainer maxWidth="lg">
        {children}
      </MainContainer>


      <Footer>
        <Typography variant="body1">© 2024 Country Finder</Typography>
      </Footer>
    </LayoutWrapper>
  );
};

export default Layout;
