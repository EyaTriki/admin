import React, { useEffect, useState } from 'react';
import { Box, Button, Typography, Grid, Card, CardContent } from "@mui/material";
import { useTheme } from '@mui/material/styles';
import DownloadOutlinedIcon from "@mui/icons-material/DownloadOutlined";
import Header from "../../components/Header";
import CustumBarChart from "../../components/CustumBarChart";
import CustumPieChart from "../../components/CustumPieChart";
import StatCard from "../../components/StatCard";
import Legend from "../../components/Legend";
import GroupIcon from '@mui/icons-material/Group';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import axios from 'axios';
import Diversity1Icon from '@mui/icons-material/Diversity1';
import { BASE_URL } from '../../config';
import { useAuth } from '../../context/AuthContext';

const Dashboard = () => {
  const theme = useTheme();
  const [specialtiesData, setSpecialtiesData] = useState([]);
  const [doctorCount, setDoctorCount] = useState(0);
  const [patientCount, setPatientCount] = useState(0);
  const [genderDistribution, setGenderDistribution] = useState([]);
  const { userToken } = useAuth();

  const getColorByGender = (gender) => {
    if (gender === 'Male') return "#013148";
    if (gender === 'Female') return "#18ba91";
    if (gender === null) return "#CCCCCC"; // Gris pour les genres non définis
    return "#00C49F"; // Couleur par défaut si nécessaire
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const specialtiesResponse = await axios.get(`${BASE_URL}/stats/doctors-by-specialty`, {
          headers: { Authorization: `Bearer ${userToken}` }
        });
        setSpecialtiesData(specialtiesResponse.data.doctorsBySpecialty.map(s => ({
          name: s._id,
          count: s.count
        })));

        const doctorCountResponse = await axios.get(`${BASE_URL}/stats/doctor-count`, {
          headers: { Authorization: `Bearer ${userToken}` }
        });
        setDoctorCount(doctorCountResponse.data.doctorCount);

        const patientCountResponse = await axios.get(`${BASE_URL}/stats/patient-count`, {
          headers: { Authorization: `Bearer ${userToken}` }
        });
        setPatientCount(patientCountResponse.data.patientCount);

        const genderDistributionResponse = await axios.get(`${BASE_URL}/stats/patient-gender`, {
          headers: { Authorization: `Bearer ${userToken}` }
        });
        setGenderDistribution(genderDistributionResponse.data.map(g => ({
          name: g._id === null ? 'Not Defined' : g._id,
          value: g.count,
          color: getColorByGender(g._id)
        })));
      } catch (error) {
        console.error('Failed to fetch data:', error);
      }
    };

    fetchData();
  }, [userToken]);

  return (
    <Box m="20px">
      <Grid container spacing={2} alignItems="center">
        <Grid item xs={12} md={8}>
          <Header title="DASHBOARD" subtitle="Welcome to your dashboard" />
        </Grid>
        <Grid item xs={12} md={4} display="flex" justifyContent="flex-end">
          <Button
            variant="contained"
            color="secondary"
            startIcon={<DownloadOutlinedIcon />}
          >
            Download Reports
          </Button>
        </Grid>
      </Grid>

      <Grid container spacing={2} mt={2}>
        <Grid item xs={12} md={6}>
          <Card sx={{ backgroundColor: "#e8f5e9", boxShadow: 3 }}>
            <CardContent>
              <Typography variant="h6" fontWeight="600" color={theme.palette.text.primary} gutterBottom>
                Doctor Specialties
              </Typography>
              <Box sx={{ height: "355px" }}>
                <CustumBarChart data={specialtiesData} dataKey="count" />
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={6} lg={3}>
          <Card sx={{ backgroundColor: "#e8f5e9", boxShadow: 3 }}>
            <CardContent>
              <Typography variant="h6" fontWeight="600" color={theme.palette.text.primary} gutterBottom>
                Gender Distribution
              </Typography>
              <Box sx={{ height: "270px" }}>
                <CustumPieChart data={genderDistribution} />
              </Box>
              <Legend items={genderDistribution.map(({ name, color }) => ({ label: name, color }))} />
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} lg={3}>
          <Grid container spacing={2} direction="column">
            <Grid item>
              <StatCard
                title="Total Doctors"
                number={doctorCount}
                icon={<Diversity1Icon />}
              />
            </Grid>
            <Grid item>
              <StatCard
                title="Total Patients"
                number={patientCount}
                icon={<GroupIcon />}
              />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Dashboard;
