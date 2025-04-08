import React from 'react';
import { Link } from 'react-router-dom';
import { useForm } from "react-hook-form";

// material-ui
import { Card, Box, Button, CardHeader, Paper, Divider, Grid, Typography, Breadcrumbs, TextField, MenuItem } from '@mui/material';

// project import
import Breadcrumb from 'component/Breadcrumb';
import { gridSpacing } from 'config.js';

// ==============================|| SAMPLE PAGE ||============================== //

const AddEditUser = () => {

    const {
        register,
        handleSubmit,
        watch,
        reset,
        formState: { errors },
    } = useForm();

    const onSubmit = (data) => {
        console.log("User Data:", data);
        alert("Registration Successful!");
        reset(); // Reset form after submission
    };

    return (
        <>
            <Box>
                {/* Breadcrumbs at the Top */}
                <Breadcrumbs sx={{ mb: 1 }}>
                    <Typography component={Link} to="/" variant="subtitle2" color="inherit" className="link-breadcrumb">
                        Home
                    </Typography>
                    <Typography variant="subtitle2" color="primary" className="link-breadcrumb">
                        Add User
                    </Typography>
                </Breadcrumbs>

                {/* Title + Button in One Line */}
                <Box display="flex" justifyContent="space-between" alignItems="center">
                    <Typography sx={{ fontWeight: 500 }} variant="h3">
                        Add User
                    </Typography>
                </Box>
            </Box>
            <Divider sx={{ my: 2 }} />
            <Box sx={{ width: "100%", display: "flex", justifyContent: "center", mt: 4 }}>
                <Paper sx={{ width: "100%", p: 4, boxShadow: 3, borderRadius: 2 }}>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <Grid container spacing={2}>
                            {/* First Name */}
                            <Grid item xs={12} sm={4}>
                                <TextField
                                    fullWidth
                                    label="First Name"
                                    {...register("firstName", { required: "First Name is required" })}
                                    error={!!errors.firstName}
                                    helperText={errors.firstName?.message}
                                />
                            </Grid>

                            {/* Last Name */}
                            <Grid item xs={12} sm={4}>
                                <TextField
                                    fullWidth
                                    label="Last Name"
                                    {...register("lastName", { required: "Last Name is required" })}
                                    error={!!errors.lastName}
                                    helperText={errors.lastName?.message}
                                />
                            </Grid>

                            {/* Mobile */}
                            <Grid item xs={12} sm={4}>
                                <TextField
                                    fullWidth
                                    label="Mobile"
                                    {...register("mobile", {
                                        required: "Mobile is required",
                                        pattern: { value: /^[0-9]{10}$/, message: "Enter a valid 10-digit mobile number" },
                                    })}
                                    error={!!errors.mobile}
                                    helperText={errors.mobile?.message}
                                />
                            </Grid>

                            {/* Email */}
                            <Grid item xs={12} sm={4}>
                                <TextField
                                    fullWidth
                                    label="Email"
                                    type="email"
                                    {...register("email", {
                                        required: "Email is required",
                                        pattern: { value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/, message: "Enter a valid email" },
                                    })}
                                    error={!!errors.email}
                                    helperText={errors.email?.message}
                                />
                            </Grid>

                            {/* Age */}
                            <Grid item xs={12} sm={4}>
                                <TextField
                                    fullWidth
                                    label="Age"
                                    type="number"
                                    {...register("age", {
                                        required: "Age is required",
                                        min: { value: 18, message: "Must be at least 18 years old" },
                                    })}
                                    error={!!errors.age}
                                    helperText={errors.age?.message}
                                />
                            </Grid>

                            {/* Gender */}
                            <Grid item xs={12} sm={4}>
                                <TextField
                                    fullWidth
                                    select
                                    label="Gender"
                                    {...register("gender", { required: "Gender is required" })}
                                    error={!!errors.gender}
                                    helperText={errors.gender?.message}
                                >
                                    <MenuItem value="male">Male</MenuItem>
                                    <MenuItem value="female">Female</MenuItem>
                                    <MenuItem value="other">Other</MenuItem>
                                </TextField>
                            </Grid>

                            {/* Username */}
                            <Grid item xs={12} sm={4}>
                                <TextField
                                    fullWidth
                                    label="Username"
                                    {...register("username", {
                                        required: "Username is required",
                                        minLength: { value: 4, message: "Must be at least 4 characters" },
                                    })}
                                    error={!!errors.username}
                                    helperText={errors.username?.message}
                                />
                            </Grid>

                            {/* Password */}
                            <Grid item xs={12} sm={4}>
                                <TextField
                                    fullWidth
                                    label="Password"
                                    type="password"
                                    {...register("password", {
                                        required: "Password is required",
                                        minLength: { value: 6, message: "Must be at least 6 characters" },
                                    })}
                                    error={!!errors.password}
                                    helperText={errors.password?.message}
                                />
                            </Grid>

                            {/* Confirm Password */}
                            <Grid item xs={12} sm={4}>
                                <TextField
                                    fullWidth
                                    label="Confirm Password"
                                    type="password"
                                    {...register("confirmPassword", {
                                        required: "Confirm Password is required",
                                        validate: (value) => value === watch("password") || "Passwords do not match",
                                    })}
                                    error={!!errors.confirmPassword}
                                    helperText={errors.confirmPassword?.message}
                                />
                            </Grid>

                            {/* Submit Button */}
                            <Grid item xs={12}>
                                <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 2 }}>
                                    Register
                                </Button>
                            </Grid>
                        </Grid>
                    </form>
                </Paper>
            </Box>
        </>
    );
};

export default AddEditUser;
