import React from 'react';
import { Box, Button, Typography, useTheme, Card, CardContent } from "@mui/material";
import { tokens } from "../../theme";
import { mockSpecialties, mockGenderDistribution } from "../../data/mockData";
import DownloadOutlinedIcon from "@mui/icons-material/DownloadOutlined";
import Header from "../../components/Header";
import CustumBarChart from "../../components/CustumBarChart";
import CustumPieChart from "../../components/CustumPieChart";
import StatCard from "../../components/StatCard";
import Legend from "../../components/Legend";  // Assurez-vous d'importer le composant Legend
import PersonIcon from '@mui/icons-material/Person'; // Importez les icônes nécessaires
import GroupIcon from '@mui/icons-material/Group'; // Icône pour les utilisateurs
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';


const Dashboard = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const specialtiesData = mockSpecialties.map(specialty => ({
    name: specialty.specialty,
    count: specialty.count,
  }));
  const genderData = [
    { name: "Male", value: mockGenderDistribution.male, color: "#0088FE" },
    { name: "Female", value: mockGenderDistribution.female, color: "#00C49F" }
  ];

  return (
    <Box m="20px">
      <Box display="grid"  justifyContent="space-between" alignItems="center">
        <Header title="DASHBOARD" subtitle="Welcome to your dashboard" />
        <Button
          variant="contained"
          color="secondary"
          startIcon={<DownloadOutlinedIcon />}
        >
          Download Reports
        </Button>
      </Box>
    
      <Box display="grid" gridTemplateColumns="repeat(12, 1fr)" gap="20px" mt="20px">
        <Card sx={{ gridColumn: "span 6",backgroundColor: "#e8f5e9" }}>
          <CardContent>
            <Typography variant="h6" fontWeight="600">
              Doctor Specialties
            </Typography>
            <Box sx={{ height: "300px" }}>
              <CustumBarChart data={specialtiesData} dataKey="count" />
            </Box>
          </CardContent>
        </Card>

        <Card sx={{ gridColumn: "span 3" ,backgroundColor: "#e8f5e9"}}>
          <CardContent>
            <Typography variant="h6" fontWeight="600">
              Gender Distribution
            </Typography>
            <Box sx={{ height: "300px" }}>
            <CustumPieChart data={[{ name: "Male", value: 20, color: "#0088FE" }, { name: "Female", value: 30, color: "#00C49F" }]} />
             </Box>
            <Legend items={genderData.map(({ name, color }) => ({ label: name, color }))} />
           
          </CardContent>
       
        </Card>
        <Box sx={{ gridColumn: "span 3" }}>
        <Box display="colum" >
        <StatCard 
  title="Total Users"
  number="6"
  icon={<GroupIcon />}
/>
      <StatCard 
  title="Total Doctors"
  number="4"
  icon={<LocalHospitalIcon />}
/>


</Box>
      </Box>
        </Box>
      </Box>
  
  );
};

export default Dashboard;
