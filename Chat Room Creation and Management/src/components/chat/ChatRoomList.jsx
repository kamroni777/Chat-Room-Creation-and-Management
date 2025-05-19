import React, { useState, useEffect, useContext } from 'react';
import { AuthContext, SocketContext } from '../../context';
import axios from 'axios';
import {
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Avatar,
  Button,
  Typography,
  CircularProgress
} from '@mui/material';

const ChatRoomList = () => {
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useContext(AuthContext);
  const socket = useContext(SocketContext);

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const res = await axios.get('/api/chat-rooms');
        setRooms(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchRooms();

    // Socket listeners for real-time updates
    socket.on('userJoined', handleUserJoined);
    socket.on('userLeft', handleUserLeft);

    return () => {
      socket.off('userJoined', handleUserJoined);
      socket.off('userLeft', handleUserLeft);
    };
  }, []);

  const handleUserJoined = (data) => {
    setRooms(prevRooms => 
      prevRooms.map(room => 
        room._id === data.roomId
          ? { ...room, participants: [...room.participants, data.user] }
          : room
      )
    );
  };

  const handleUserLeft = (data) => {
    setRooms(prevRooms => 
      prevRooms.map(room => 
        room._id === data.roomId
          ? { 
              ...room, 
              participants: room.participants.filter(p => p._id !== data.user._id) 
            }
          : room
      )
    );
  };

  const handleJoinRoom = async (roomId) => {
    try {
      await axios.post(`/api/chat-rooms/${roomId}/join`);
      socket.emit('joinRoom', roomId);
    } catch (err) {
      console.error('Error joining room:', err);
    }
  };

  if (loading) return <CircularProgress />;

  return (
    <List>
      {rooms.map(room => (
        <ListItem key={room._id} divider>
          <ListItemAvatar>
            <Avatar>{room.name.charAt(0)}</Avatar>
          </ListItemAvatar>
          <ListItemText
            primary={room.name}
            secondary={`Created by ${room.creator.username}`}
          />
          <Button 
            variant="contained" 
            onClick={() => handleJoinRoom(room._id)}
            disabled={room.participants.some(p => p._id === user._id)}
          >
            {room.participants.some(p => p._id === user._id) ? 'Joined' : 'Join'}
          </Button>
        </ListItem>
      ))}
    </List>
  );
};

export default ChatRoomList;