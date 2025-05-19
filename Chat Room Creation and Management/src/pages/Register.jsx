import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../auth/AuthContext';
import RegisterForm from '../auth/RegisterForm';
import { Container, Box, Typography, Link } from '@mui/material';

export default function RegisterPage() {
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
          Create Account
        </Typography>
        <RegisterForm />
        <Typography variant="body2" sx={{ mt: 2 }}>
          Already have an account?{' '}
          <Link href="/login" underline="hover">
            Login here
          </Link>
        </Typography>
      </Box>
    </Container>
  );
}