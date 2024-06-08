import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Box, IconButton, useTheme } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import Header from "../../components/Header";
import { useAuth } from '../../context/AuthContext';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

const Contacts = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { userToken } = useAuth();

  useEffect(() => {
    const fetchPatients = async () => {
      setLoading(true);
      setError('');
      try {
        const response = await axios.get('http://192.168.234.176:5000/get-users', {
          headers: { 'Authorization': `Bearer ${userToken}` }
        });
        setPatients(response.data);
      } catch (error) {
        console.error('Failed to fetch patients:', error);
        setError('Failed to fetch patients');
      } finally {
        setLoading(false);
      }
    };

    if (userToken) {
      fetchPatients();
    } else {
      setError('Unauthorized: No user token available');
    }
  }, [userToken]);

  const handleDelete = (id) => {
    // Confirmation de suppression
    if (window.confirm('Are you sure you want to delete this user?')) {
      axios.delete(`http://192.168.234.176:5000/deleteUser/${id}`, {
        headers: { 'Authorization': `Bearer ${userToken}` }
      })
      .then(response => {
        // Affichage d'une confirmation ou d'une mise à jour de l'état
        console.log(response.data.message);
        // Filtrer le tableau pour enlever l'utilisateur supprimé
        setPatients(prevPatients => prevPatients.filter(user => user._id !== id));
      })
      .catch(error => {
        console.error('Failed to delete user:', error);
        alert('Failed to delete user: ' + (error.response?.data.message || error.message));
      });
    }
  };
  

  const handleEdit = (id) => {
    // Implement the edit functionality here
    console.log('Editing user with id:', id);
  };

  const formatDate = (value) => {
    if (!value) {
      return "";  // Retourne une chaîne vide si la valeur est null ou undefined
    }
    return new Date(value).toLocaleDateString();
  };
  
  
  const columns = [
    { field: "_id", headerName: "Register ID", flex: 1.5 },
    { field: "fullname", headerName: "Name", flex: 1 },
    { field: "gender", headerName: "Gender", flex: 1},
    {
      field: "birthdate",
      headerName: "Birthdate",
      type: 'date',
      flex: 1,
      valueFormatter: (params) => formatDate(params.value),  // Appliquer le formatteur modifié
    },
    { field: "email", headerName: "Email", flex: 1.5 },
    { field: "location", headerName: "Address", flex: 1 },
   
    {
      field: "actions",
      headerName: "More",
      flex: 1,
      renderCell: (params) => (
        <Box>
          <IconButton onClick={() => handleEdit(params.id)}  sx={{ color: colors.greenAccent[600] }}>
            <EditIcon />
          </IconButton>
          <IconButton onClick={() => handleDelete(params.id)} color="error">
            <DeleteIcon />
          </IconButton>
        </Box>
      ),
    },
  ];

  return (
    <Box m="20px">
      <Header title="ALL USERS" subtitle="List of users" />
      {loading ? (
        <Box display="flex" justifyContent="center" alignItems="center" height="75vh">
          Loading...
        </Box>
      ) : error ? (
        <Box color="red">{error}</Box>
      ) : (
        <Box m="40px 0 0 0" height="75vh" sx={{
          "& .MuiDataGrid-root": { border: "none" },
          "& .MuiDataGrid-cell": { borderBottom: "none" },
          "& .name-column--cell": { color: colors.greenAccent[300] },
          "& .MuiDataGrid-columnHeaders": { backgroundColor: colors.blueAccent[700], borderBottom: "none" },
          "& .MuiDataGrid-virtualScroller": { backgroundColor: colors.primary[400] },
          "& .MuiDataGrid-footerContainer": { borderTop: "none", backgroundColor: colors.blueAccent[700] },
          "& .MuiCheckbox-root": { color: `${colors.greenAccent[200]} !important` },
          "& .MuiDataGrid-toolbarContainer .MuiButton-text": { color: `${colors.grey[100]} !important` },
        }}>
          <DataGrid
            rows={patients}
            columns={columns}
            getRowId={(row) => row._id}
            components={{ Toolbar: GridToolbar }}
          />
        </Box>
      )}
    </Box>
  );
};

export default Contacts;
