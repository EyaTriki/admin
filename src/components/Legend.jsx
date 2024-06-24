import React from 'react';
import { Box, Typography } from '@mui/material';

const Legend = ({ items }) => {
  return (
    <Box display="flex" flexDirection="column">
      {items.map((item, index) => (
        <Box key={index} display="flex" alignItems="center" mb={1}>
          <Box width={20} height={20} bgcolor={item.color} mr={1} />
          <Typography variant="body2">{item.label}</Typography>
        </Box>
      ))}
    </Box>
  );
};

export default Legend;
