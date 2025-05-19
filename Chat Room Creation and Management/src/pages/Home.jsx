 import { useContext } from 'react';
import { AuthContext } from '../auth/AuthContext';
import { Button, Container, Typography, Box } from '@mui/material';
import { Link } from 'react-router-dom';

export default function Home() {
  const { user } = useContext(AuthContext);

  return (
    <Container maxWidth="sm">
      <Box sx={{ mt: 8, textAlign: 'center' }}>
        <Typography variant="h3" gutterBottom>
          Welcome to ChatApp
        </Typography>
        
        {user ? (
          <>
            <Typography variant="h5" sx={{ mb: 4 }}>
              Hello, {user.username}!
            </Typography>
            <Button 
              variant="contained" 
              size="large" 
              component={Link} 
              to="/chat"
              sx={{ mr: 2 }}
            >
              Go to Chat
            </Button>
          </>
        ) : (
          <>
            <Typography variant="body1" sx={{ mb: 4 }}>
              Please login or register to start chatting
            </Typography>
            <Button 
              variant="contained" 
              size="large" 
              component={Link} 
              to="/login"
              sx={{ mr: 2 }}
            >
              Login
            </Button>
            <Button 
              variant="outlined" 
              size="large" 
              component={Link} 
              to="/register"
            >
              Register
            </Button>
          </>
        )}
      </Box>
    </Container>
  );
}