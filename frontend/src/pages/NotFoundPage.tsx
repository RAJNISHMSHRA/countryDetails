import React from 'react';
import { Container, Typography, Button} from '@mui/material';
import { Link } from 'react-router-dom'; // Import Link for navigation
import { useTheme } from '@mui/material/styles';
import notfound from '../images/404-page-not-found.svg'

const NotFoundPage: React.FC = () => {
  const theme = useTheme();

  return (
    <Container
      sx={{
        textAlign: 'center',
        padding: theme.spacing(4),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
      }}
    >
  
      <img 
        src={notfound}
        alt="Page not found"
        style={{ maxWidth: '60%', height: 'auto', marginBottom: theme.spacing(4) }}
      />
      <Typography variant="h3" sx={{ fontWeight: 'bold', marginBottom: theme.spacing(2) }}>
        404 - Page Not Found
      </Typography>
      <Typography variant="h5" sx={{ color: theme.palette.text.secondary, marginBottom: theme.spacing(4) }}>
        Oops! The page you are looking for does not exist.
      </Typography>
      
  
      <Button
        variant="contained"
        color="primary"
        component={Link}
        to="/" 
        sx={{ padding: theme.spacing(1, 4) }}
      >
        Go Back to Home
      </Button>
    </Container>
  );
};

export default NotFoundPage;
