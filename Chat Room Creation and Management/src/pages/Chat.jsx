import { useState } from 'react';
import { TextField, Button, List, ListItem, ListItemText } from '@mui/material';

export default function Chat({ socket, messages }) {
  const [message, setMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (message.trim()) {
      socket.emit('sendMessage', message);
      setMessage('');
    }
  };

  return (
    <div>
      <List>
        {messages.map((msg, i) => (
          <ListItem key={i}>
            <ListItemText primary={msg} />
          </ListItem>
        ))}
      </List>
      <form onSubmit={handleSubmit}>
        <TextField
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type a message..."
        />
        <Button type="submit">Send</Button>
      </form>
    </div>
  );
}