import React from 'react';
import {
  Box, Button, TextField, Snackbar, Alert, MenuItem
} from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";

import Header from "../../components/Header";
import { useAuth } from "../../context/AuthContext";

const Form = () => {
  const [openSnackbar, setOpenSnackbar] = React.useState(false);
  const [snackbarMessage, setSnackbarMessage] = React.useState('');
  const [snackbarSeverity, setSnackbarSeverity] = React.useState('info');
  const { userToken } = useAuth();
  const [role, setRole] = React.useState("");

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

  const handleFormSubmit = async (values, { setSubmitting, resetForm }) => {
    try {
      console.log('User created successfully');
      handleOpenSnackbar('User created successfully', 'success');
      resetForm();
    } catch (error) {
      console.error('Failed to create user:', error.message);
      handleOpenSnackbar('Failed to create user', 'error');
    } finally {
      setSubmitting(false);
    }
  };

  const initialValues = {
    firstName: "",
    lastName: "",
    email: "",
    address: "",
    gender: "",
    password: "",
    role: "",
    speciality: ""
  };

  const validationSchema = yup.object().shape({
    firstName: yup.string().required("Required"),
    lastName: yup.string().required("Required"),
    email: yup.string().email("Invalid email").required("Required"),
    address: yup.string(),
    gender: yup.string().required("Required"),
    password: yup.string().min(8, "Password must be at least 8 characters").required("Required"),
    role: yup.string().required("Required"),
    speciality: yup.string().when("role", {
      is: "medecin",
      then: yup.string().required("Speciality is required for doctors"),
    }),
  });

  return (
    <Box m="20px">
      <Header title="CREATE ACCOUNT" subtitle="Create a New User/Doctor Account" />
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleFormSubmit}
      >
        {({ values, errors, touched, handleChange, handleBlur, handleSubmit, isSubmitting }) => (
          <form onSubmit={handleSubmit}>
            <Box display="grid" gap="30px" gridTemplateColumns="repeat(2, 1fr)">
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="First Name"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.firstName}
                name="firstName"
                error={touched.firstName && !!errors.firstName}
                helperText={touched.firstName && errors.firstName}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Last Name"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.lastName}
                name="lastName"
                error={touched.lastName && !!errors.lastName}
                helperText={touched.lastName && errors.lastName}
              />
               <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Email"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.email}
                name="email"
                error={touched.email && !!errors.email}
                helperText={touched.email && errors.email}
              />
               <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Password"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.password}
                name="password"
                error={touched.password && !!errors.password}
                helperText={touched.password && errors.password}
              />
              <TextField
                select
                fullWidth
                label="Role"
                value={role}
                onChange={(event) => {
                  setRole(event.target.value);
                  handleChange(event);
                }}
                onBlur={handleBlur}
                name="role"
                error={touched.role && !!errors.role}
                helperText={touched.role && errors.role}
                variant="filled"
              >
                <MenuItem value="">Select a Role</MenuItem>
                <MenuItem value="medecin">Doctor</MenuItem>
                <MenuItem value="patient">User</MenuItem>
              </TextField>
              {role === "medecin" && (
                <TextField
                  fullWidth
                  variant="filled"
                  type="text"
                  label="Speciality"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.speciality}
                  name="speciality"
                  error={touched.speciality && !!errors.speciality}
                  helperText={touched.speciality && errors.speciality}
                />
              )}
            </Box>
            <Box display="flex" justifyContent="end" mt="20px">
              <Button type="submit" color="secondary" variant="contained" disabled={isSubmitting}>
                Create New User
              </Button>
            </Box>
          </form>
        )}
      </Formik>
      <Snackbar open={openSnackbar} autoHideDuration={6000} onClose={handleCloseSnackbar}>
        <Alert onClose={handleCloseSnackbar} severity={snackbarSeverity} sx={{ width: '100%' }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default Form;
