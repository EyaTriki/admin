import React from 'react';
import { Card, CardContent, Typography, Box } from '@mui/material';

const StatCard = ({ title, number, icon }) => (
  <Card sx={{ width: 250, m: 2, boxShadow: 3, borderRadius: 2, backgroundColor: "#f0f4f8" }}>
    <CardContent>
      <Typography variant="subtitle1" color="textSecondary" gutterBottom>
        {title}
      </Typography>
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <Typography variant="h4" color="textPrimary" fontWeight="bold">
          {number}
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          {icon}
        </Box>
      </Box>
    </CardContent>
  </Card>
);

export default StatCard;
