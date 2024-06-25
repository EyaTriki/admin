import React from 'react';
import { List, ListItem, ListItemText, Box, Typography, IconButton, Button } from "@mui/material";
import WarningIcon from '@mui/icons-material/Warning';

const notifications = [
  { id: 1, message: "Emergency", timestamp: "2024-06-10 10:00:00", content: "User 123456 has an urgent health issue." },
];

const NotificationList = () => {
  return (
    <Box>
      <List>
        {notifications.map((notification) => (
          <ListItem key={notification.id} alignItems="flex-start">
            <IconButton edge="start" aria-label="urgent">
              <WarningIcon color="error" />
            </IconButton>
            <ListItemText
              primary={notification.message}
              secondary={
                <React.Fragment>
                  <Typography
                    component="span"
                    variant="body2"
                    color="text.primary"
                  >
                    {notification.timestamp}
                  </Typography>
                  {" — " + notification.content}
                  <Box mt={1}>
                    <Button 
                      variant="contained" 
                      color="error" 
                      onClick={() => window.location.href="tel:911"}
                    >
                      Call 911 Immediately!
                    </Button>
                  </Box>
                </React.Fragment>
              }
            />
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default NotificationList;
