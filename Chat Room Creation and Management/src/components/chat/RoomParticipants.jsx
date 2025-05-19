import React, { useState, useEffect, useContext } from 'react';
import { SocketContext } from '../../context';
import {
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Avatar,
  Typography,
  Paper
} from '@mui/material';

const RoomParticipants = ({ room }) => {
  const [participants, setParticipants] = useState(room.participants);
  const socket = useContext(SocketContext);

  useEffect(() => {
    const handleUserJoined = (data) => {
      if (data.roomId === room._id) {
        setParticipants(prev => [...prev, data.user]);
      }
    };

    const handleUserLeft = (data) => {
      if (data.roomId === room._id) {
        setParticipants(prev => prev.filter(p => p._id !== data.user._id));
      }
    };

    socket.on('userJoined', handleUserJoined);
    socket.on('userLeft', handleUserLeft);

    return () => {
      socket.off('userJoined', handleUserJoined);
      socket.off('userLeft', handleUserLeft);
    };
  }, [room._id]);

  return (
    <Paper elevation={3} sx={{ p: 2 }}>
      <Typography variant="h6" gutterBottom>
        Participants ({participants.length})
      </Typography>
      <List>
        {participants.map(user => (
          <ListItem key={user._id}>
            <ListItemAvatar>
              <Avatar>{user.username.charAt(0)}</Avatar>
            </ListItemAvatar>
            <ListItemText primary={user.username} />
          </ListItem>
        ))}
      </List>
    </Paper>
  );
};

export default RoomParticipants;