import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { BASE_URL } from '../../config';
import { Box, IconButton, useTheme, Snackbar, Alert, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Button } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import Header from "../../components/Header";
import { useAuth } from '../../context/AuthContext';
import DeleteIcon from '@mui/icons-material/Delete';

const Contacts = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { userToken } = useAuth();
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('info');
  const [openConfirmDialog, setOpenConfirmDialog] = useState(false);
  const [patientToDelete, setPatientToDelete] = useState(null);

  useEffect(() => {
    const fetchPatients = async () => {
      setLoading(true);
      setError('');
      try {
        const response = await axios.get(`${BASE_URL}/get-users`, {
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

  const handleOpenSnackbar = (message, severity) => {
    setSnackbarMessage(message);
    setSnackbarSeverity(severity);
    setOpenSnackbar(true);
  };

  const handleCloseSnackbar = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenSnackbar(false);
  };

  const handleDeleteClick = (id) => {
    setPatientToDelete(id);
    setOpenConfirmDialog(true);
  };

  const handleConfirmDelete = async () => {
    try {
      await axios.delete(`${BASE_URL}/deletePatient/${patientToDelete}`, {
        headers: { 'Authorization': `Bearer ${userToken}` }
      });
      setPatients(patients.filter(patient => patient._id !== patientToDelete));
      handleOpenSnackbar('Patient deleted successfully', 'success');
    } catch (error) {
      console.error('Failed to delete patient:', error);
      handleOpenSnackbar('Failed to delete patient', 'error');
    } finally {
      setOpenConfirmDialog(false);
    }
  };

  const handleCancelDelete = () => {
    setOpenConfirmDialog(false);
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
    { field: "gender", headerName: "Gender", flex: 1 },
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
      headerName: "Delete",
      flex: 1,
      renderCell: (params) => (
        <Box>
          <IconButton onClick={() => handleDeleteClick(params.id)} color="error">
            <DeleteIcon />
          </IconButton>
        </Box>
      ),
    },
  ];

  return (
    <Box m="20px">
      <Header title="USERS" subtitle="Managing the Users List" />
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
          "& .MuiDataGrid-columnHeaders": { backgroundColor: colors.greenAccent[700], borderBottom: "none" },
          "& .MuiDataGrid-virtualScroller": { backgroundColor: colors.primary[400] },
          "& .MuiDataGrid-footerContainer": { borderTop: "none", backgroundColor: colors.greenAccent[700] },
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

      <Dialog open={openConfirmDialog} onClose={handleCancelDelete}>
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete this patient? This action cannot be undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCancelDelete} color="primary">
            Cancel
          </Button>
          <Button onClick={handleConfirmDelete} color="secondary">
            Delete
          </Button>
        </DialogActions>
      </Dialog>

      <Snackbar open={openSnackbar} autoHideDuration={6000} onClose={handleCloseSnackbar}>
        <Alert onClose={handleCloseSnackbar} severity={snackbarSeverity} sx={{ width: '100%' }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default Contacts;
