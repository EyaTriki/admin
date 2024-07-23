import React, { useEffect, useState } from 'react';
import {
  Box, Typography, useTheme, MenuItem, Select, Snackbar, Alert, FormControl,
  InputLabel, IconButton, Dialog, DialogActions, DialogContent, DialogContentText,
  DialogTitle, Button, TextField
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import axios from 'axios';
import { tokens } from "../../theme";
import Header from "../../components/Header";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete'; 
import { BASE_URL } from '../../config';
import { useAuth } from "../../context/AuthContext";



const Team = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [doctors, setDoctors] = useState([]);
  const [specialty, setSpecialty] = useState('');
  const { userToken } = useAuth();
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [updateData, setUpdateData] = useState({
    fullname: '',
    address: '',
    email: '',
    phoneNumber: '',
    //specialty: '',
    officeHours: '',
    bio: ''
  });
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('info');
  const [openConfirmDialog, setOpenConfirmDialog] = useState(false);
  const [doctorToDelete, setDoctorToDelete] = useState(null);

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

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/get-doctors`, {
          params: { specialty },
          headers: {
            Authorization: `Bearer ${userToken}`
          }
        });
        setDoctors(response.data);
      } catch (error) {
        console.error("Failed to fetch doctors:", error);
      }
    };

    fetchDoctors();
  }, [specialty, userToken]);

  const handleSpecialtyChange = (event) => {
    setSpecialty(event.target.value);
  };

  const handleEditClick = (doctor) => {
    setSelectedDoctor(doctor);
    setUpdateData({
      fullname: doctor.fullname,
      email: doctor.email,
      address: doctor.address,
      phoneNumber: doctor.phoneNumber,
      //specialty: doctor.specialty,
      bio: doctor.bio,
      officeHours: doctor.officeHours
    });
    setOpenEditDialog(true);
  };

  const handleEditDialogClose = () => {
    setOpenEditDialog(false);
  };

  const handleUpdateDataChange = (event) => {
    const { name, value } = event.target;
    setUpdateData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleUpdateSubmit = async () => {
    try {
      const response = await axios.put(`${BASE_URL}/modif-doctor`, {
        id: selectedDoctor._id,
        updateData
      }, {
        headers: {
          Authorization: `Bearer ${userToken}`
        }
      });
      setOpenEditDialog(false);
      setDoctors(doctors.map(doc => doc._id === selectedDoctor._id ? response.data.updatedDoc : doc));
      handleOpenSnackbar('Doctor updated successfully', 'success');
    } catch (error) {
      console.error("Failed to update doctor:", error);
      handleOpenSnackbar('Failed to update doctor', 'error');
    }
  };

  const handleDeleteClick = (doctorId) => {
    setDoctorToDelete(doctorId);
    setOpenConfirmDialog(true);
  };

  const handleConfirmDelete = async () => {
    try {
      await axios.delete(`${BASE_URL}/delete-doctor/${doctorToDelete}`, {
        headers: {
          Authorization: `Bearer ${userToken}`
        }
      });
      setDoctors(doctors.filter(doc => doc._id !== doctorToDelete));
      handleOpenSnackbar('Doctor deleted successfully', 'success');
    } catch (error) {
      console.error("Failed to delete doctor:", error);
      handleOpenSnackbar('Failed to delete doctor', 'error');
    } finally {
      setOpenConfirmDialog(false);
    }
  };

  const handleCancelDelete = () => {
    setOpenConfirmDialog(false);
  };

  const columns = [
    { field: "_id", headerName: "ID", flex: 1 },
    {
      field: "fullname",
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
      field: "phoneNumber",
      headerName: "Phone Number",
      flex: 1,
    },
    {
      field: "email",
      headerName: "Email",
      flex: 1,
    },
    {
      field: "bio",
      headerName: "Bio",
      flex: 1,
    },
    {
      field: "officeHours",
      headerName: "Working Hours",
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
            <Typography color={colors.grey[100]} sx={{ ml: "5px" }}>
              {specialty}
            </Typography>
          </Box>
        );
      },
    },
    {
      field: "actions",
      headerName: "Actions",
      flex: 1,
      renderCell: ({ row }) => {
        return (
          <>
            <IconButton onClick={() => handleEditClick(row)}>
              <EditIcon color="primary" />
            </IconButton>
            <IconButton onClick={() => handleDeleteClick(row._id)}>
              <DeleteIcon color="error" />
            </IconButton>
          </>
        );
      }
    }
  ];

  return (
    <Box m="20px">
      <Header title="DOCTORS" subtitle="Managing the Doctors List" />
      <FormControl fullWidth variant="filled" sx={{ mb: 2 }}>
        <InputLabel id="specialty-label">Specialty</InputLabel>
        <Select
          labelId="specialty-label"
          value={specialty}
          onChange={handleSpecialtyChange}
        >
          <MenuItem value="">All Specialties</MenuItem>
          <MenuItem value="Dentist">Dentist</MenuItem>
<MenuItem value="Gynecologist">Gynecologist</MenuItem>
<MenuItem value="Laboratory">Laboratory</MenuItem>
<MenuItem value="Veterinarian">Veterinarian</MenuItem>
<MenuItem value="General Practitioner">General Practitioner</MenuItem>
<MenuItem value="Sexologist">Sexologist</MenuItem>
<MenuItem value="Dermatologist">Dermatologist</MenuItem>
<MenuItem value="Ophthalmologist">Ophthalmologist</MenuItem>
<MenuItem value="Orthopedist">Orthopedist</MenuItem>
<MenuItem value="ENT">ENT</MenuItem>
<MenuItem value="Psychiatrist">Psychiatrist</MenuItem>
<MenuItem value="Cardiologist">Cardiologist</MenuItem>
<MenuItem value="Gastroenterologist">Gastroenterologist</MenuItem>
<MenuItem value="Pediatrician">Pediatrician</MenuItem>
<MenuItem value="Rheumatologist">Rheumatologist</MenuItem>
<MenuItem value="Neurologist">Neurologist</MenuItem>
<MenuItem value="Pulmonologist">Pulmonologist</MenuItem>
<MenuItem value="Nutritionist">Nutritionist</MenuItem>
<MenuItem value="Child Psychiatrist">Child Psychiatrist</MenuItem>
<MenuItem value="Diabetologist">Diabetologist</MenuItem>
<MenuItem value="Nephrologist">Nephrologist</MenuItem>

          <MenuItem value="other">Other</MenuItem>
        </Select>
      </FormControl>
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
        <DataGrid
          checkboxSelection
          rows={doctors}
          columns={columns}
          getRowId={(row) => row._id} // Utilisez cette ligne pour spécifier l'ID personnalisé
        />
      </Box>

      <Dialog open={openEditDialog} onClose={handleEditDialogClose}>
        <DialogTitle>Edit Doctor</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Update the information for the selected doctor.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            name="fullname"
            label="Full Name"
            type="text"
            fullWidth
            variant="filled"
            value={updateData.fullname}
            onChange={handleUpdateDataChange}
          />
          <TextField
            autoFocus
            margin="dense"
            name="email"
            label="Email"
            type="text"
            fullWidth
            variant="filled"
            value={updateData.email}
            onChange={handleUpdateDataChange}
          />
          <TextField
            margin="dense"
            name="address"
            label="Address"
            type="text"
            fullWidth
            variant="filled"
            value={updateData.address}
            onChange={handleUpdateDataChange}
          />
          <TextField
            margin="dense"
            name="phoneNumber"
            label="Phone Number"
            type="text"
            fullWidth
            variant="filled"
            value={updateData.phoneNumber}
            onChange={handleUpdateDataChange}
          />
          <TextField
            margin="dense"
            name="bio"
            label="Bio"
            type="text"
            fullWidth
            variant="filled"
            value={updateData.bio}
            onChange={handleUpdateDataChange}
          />
          <TextField
            margin="dense"
            name="officeHours"
            label="Working Hours"
            type="text"
            fullWidth
            variant="filled"
            value={updateData.officeHours}
            onChange={handleUpdateDataChange}
          />
          {/* <TextField
            margin="dense"
            name="specialty"
            label="Specialty"
            type="text"
            fullWidth
            variant="filled"
            value={updateData.specialty}
            onChange={handleUpdateDataChange}
          /> */}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleEditDialogClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleUpdateSubmit} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog open={openConfirmDialog} onClose={handleCancelDelete}>
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete this doctor?
            This action cannot be undone.
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

export default Team;
