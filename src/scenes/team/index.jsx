import React from 'react';
import { Box, Typography, useTheme } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import { mockDataDoctors } from "../../data/mockData";
import Header from "../../components/Header";
import FavoriteIcon from '@mui/icons-material/Favorite'; // Cardiology
import PsychologyIcon from '@mui/icons-material/Psychology'; // Neurology
import ChildCareIcon from '@mui/icons-material/ChildCare'; // Pediatrics
import FaceIcon from '@mui/icons-material/Face'; // Dermatology
import VisibilityIcon from '@mui/icons-material/Visibility'; // Ophthalmology

const getSpecialtyIcon = (specialty) => {
  switch (specialty) {
    case "cardiology":
      return <FavoriteIcon color="error" />;
    case "neurology":
      return <PsychologyIcon color="primary" />;
    case "pediatrics":
      return <ChildCareIcon color="secondary" />;
    case "dermatology":
      return <FaceIcon style={{ color: '#ffb74d' }} />;
    case "ophthalmology":
      return <VisibilityIcon style={{ color: '#2196f3' }} />;
    default:
      return null;
  }
};

const Team = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const columns = [
    { field: "id", headerName: "ID" },
    {
      field: "name",
      headerName: "Name",
      flex: 1,
      cellClassName: "name-column--cell",
    },
    {
      field: "address",
      headerName: "Address",
      flex: 1,
    },
    {
      field: "phone",
      headerName: "Phone Number",
      flex: 1,
    },
    {
      field: "email",
      headerName: "Email",
      flex: 1,
    },
    {
      field: "specialty",
      headerName: "Specialty",
      flex: 1,
      renderCell: ({ row: { specialty } }) => {
        return (
          <Box
            width="100%"
            display="flex"
            alignItems="center"
          >
            {getSpecialtyIcon(specialty)}
            <Typography color={colors.grey[100]} sx={{ ml: "5px" }}>
              {specialty}
            </Typography>
          </Box>
        );
      },
    },
  ];

  return (
    <Box m="20px">
      <Header title="DOCTORS" subtitle="Managing the Doctors List" />
      <Box
        m="40px 0 0 0"
        height="75vh"
        sx={{
          "& .MuiDataGrid-root": {
            border: "none",
          },
          "& .MuiDataGrid-cell": {
            borderBottom: "none",
          },
          "& .name-column--cell": {
            color: colors.greenAccent[300],
          },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: colors.greenAccent[700],
            borderBottom: "none",
          },
          "& .MuiDataGrid-virtualScroller": {
            backgroundColor: colors.primary[400],
          },
          "& .MuiDataGrid-footerContainer": {
            borderTop: "none",
            backgroundColor: colors.greenAccent[700],
          },
          "& .MuiCheckbox-root": {
            color: `${colors.greenAccent[200]} !important`,
          },
        }}
      >
        <DataGrid checkboxSelection rows={mockDataDoctors} columns={columns} />
      </Box>
    </Box>
  );
};

export default Team;
