import React from 'react';
import {
  Box, Button, TextField, Snackbar, Alert, MenuItem, Select, InputLabel, FormControl
} from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import Header from "../../components/Header";
import { useAuth } from "../../context/AuthContext";
import axios from 'axios';
import { BASE_URL } from '../../config';

const Form = () => {
  const [openSnackbar, setOpenSnackbar] = React.useState(false);
  const [snackbarMessage, setSnackbarMessage] = React.useState('');
  const [snackbarSeverity, setSnackbarSeverity] = React.useState('info');
  const { userToken } = useAuth();
  const [role, setRole] = React.useState("");

  const specialities = [
    'Cardiologist','Psychiatrist',"Dentist", "Gynecologist", "Laboratory", "Veterinarian",
    'Gastroenterologist','ENT','Orthopedist','Ophthalmologist','Dermatologist','Sexologist',"General Practitioner",
     'Nephrologist','Diabetologist','Child Psychiatrist','Nutritionist', 'Pulmonologist','Neurologist','Rheumatologist','Pediatrician', "other"
  ];

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
    const url = role === 'medecin' ? 'create-doctor' : 'create-Patient';
  
    try {
      const response = await axios.post(`${BASE_URL}/${url}`, values, {
        headers: {
          Authorization: `Bearer ${userToken}`
        }
      });
      handleOpenSnackbar('User created successfully', 'success');
      resetForm();
    } catch (error) {
      handleOpenSnackbar('Failed to create user', 'error');
    } finally {
      setSubmitting(false);
    }
  };
  
  const initialValues = {
    fullname: "",
    email: "",
    password: "",
    role: "",
    specialty: "",
    address: "",
    phoneNumber: "",
    officeHours: "",
    bio: ""
  };

  const validationSchema = yup.object().shape({
    fullname: yup.string().required("Required"),
    email: yup.string().email("Invalid email").required("Required"),
    password: yup.string().min(8, "Password must be at least 8 characters").required("Required"),
    role: yup.string().required("Required"),
    specialty: yup.string().when("role", {
      is: "medecin",
      then: yup.string().required("Speciality is required for doctors"),
    }),
    address: yup.string().when("role", {
      is: "medecin",
      then: yup.string().required("Address is required for doctors"),
    }),
    phoneNumber: yup.string().when("role", {
      is: "medecin",
      then: yup.string().required("Phone number is required for doctors"),
    }),
    officeHours: yup.string().when("role", {
      is: "medecin",
      then: yup.string().required("Working hours are required for doctors"),
    }),
    bio: yup.string().when("role", {
      is: "medecin",
      then: yup.string().required("Bio is required for doctors"),
    }),
  });

  return (
    <Box m="20px">
      <Header title="CREATE ACCOUNT" subtitle="Create a New Patient/Doctor Account" />
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
                label="Full Name"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.fullname}
                name="fullname"
                error={touched.fullname && !!errors.fullname}
                helperText={touched.fullname && errors.fullname}
              />
              <TextField
                fullWidth
                variant="filled"
                type="email"
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
                type="password"
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
                <MenuItem value="patient">Patient</MenuItem>
              </TextField>
              {role === "medecin" && (
                <>
                  <FormControl fullWidth variant="filled">
                    <InputLabel>Speciality</InputLabel>
                    <Select
                      name="specialty"
                      value={values.specialty}
                      onBlur={handleBlur}
                      onChange={handleChange}
                      error={touched.specialty && !!errors.specialty}
                    >
                      {specialities.map((specialty, index) => (
                        <MenuItem key={index} value={specialty}>{specialty}</MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                  <TextField
                    fullWidth
                    variant="filled"
                    type="text"
                    label="Address"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.address}
                    name="address"
                    error={touched.address && !!errors.address}
                    helperText={touched.address && errors.address}
                  />
                  <TextField
                    fullWidth
                    variant="filled"
                    type="text"
                    label="Phone Number"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.phoneNumber}
                    name="phoneNumber"
                    error={touched.phoneNumber && !!errors.phoneNumber}
                    helperText={touched.phoneNumber && errors.phoneNumber}
                  />
                  <TextField
                    fullWidth
                    variant="filled"
                    type="text"
                    label="Working Hours"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.officeHours}
                    name="officeHours"
                    error={touched.officeHours && !!errors.officeHours}
                    helperText={touched.officeHours && errors.officeHours}
                  />
                  <TextField
                    fullWidth
                    variant="filled"
                    type="text"
                    label="Bio"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.bio}
                    name="bio"
                    error={touched.bio && !!errors.bio}
                    helperText={touched.bio && errors.bio}
                  />
                </>
              )}
            </Box>
            <Box display="flex" justifyContent="end" mt="20px">
              <Button type="submit" color="secondary" variant="contained" disabled={isSubmitting}>
                Create
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
