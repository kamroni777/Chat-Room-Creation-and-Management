import React, { useState, useContext } from 'react';
import { AuthContext } from '../../context';
import axios from 'axios';
import {
  TextField,
  Button,
  Box,
  Typography,
  CircularProgress
} from '@mui/material';

const CreateRoomForm = ({ onRoomCreated }) => {
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { user } = useContext(AuthContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const res = await axios.post('/api/chat-rooms', { name });
      onRoomCreated(res.data);
      setName('');
      setError('');
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to create room');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
      <Typography variant="h6" gutterBottom>
        Create New Room
      </Typography>
      <TextField
        label="Room Name"
        variant="outlined"
        fullWidth
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
        margin="normal"
        error={!!error}
        helperText={error}
      />
      <Button
        type="submit"
        variant="contained"
        color="primary"
        disabled={loading || !name.trim()}
        fullWidth
        sx={{ mt: 2 }}
      >
        {loading ? <CircularProgress size={24} /> : 'Create Room'}
      </Button>
    </Box>
  );
};

export default CreateRoomForm;