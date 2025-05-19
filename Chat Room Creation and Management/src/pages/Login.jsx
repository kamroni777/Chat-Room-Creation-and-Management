import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../auth/AuthContext';
import LoginForm from '../auth/LoginForm';
import { Container, Box, Typography, Link } from '@mui/material';

export default function LoginPage() {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  if (user) {
    navigate('/chat');
    return null;
  }

  return (
    <Container maxWidth="xs">
      <Box sx={{ mt: 8, textAlign: 'center' }}>
        <Typography variant="h4" gutterBottom>
          Login
        </Typography>
        <LoginForm />
        <Typography variant="body2" sx={{ mt: 2 }}>
          Don't have an account?{' '}
          <Link href="/register" underline="hover">
            Register here
          </Link>
        </Typography>
      </Box>
    </Container>
  );
}