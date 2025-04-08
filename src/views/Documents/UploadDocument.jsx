import React, { useState } from "react";
import { Link } from 'react-router-dom';
import { useForm } from "react-hook-form";

// material-ui
import { Card, Box, Button, CardHeader, Paper, Divider, Grid, Typography, Breadcrumbs, TextField, MenuItem, InputAdornment } from '@mui/material';

// project import
import Breadcrumb from 'component/Breadcrumb';
import { gridSpacing } from 'config.js';

// ==============================|| SAMPLE PAGE ||============================== //

const UploadDocument = () => {

    const { register, handleSubmit, formState: { errors } } = useForm();
    const [selectedFile, setSelectedFile] = useState(null);

    const onSubmit = (data) => {
        console.log("Uploaded Document:", { ...data, file: selectedFile });
        alert("Document Uploaded Successfully!");
    };

    const handleFileChange = (event) => {
        setSelectedFile(event.target.files[0]);
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
                        Upload Document
                    </Typography>
                </Breadcrumbs>

                {/* Title + Button in One Line */}
                <Box display="flex" justifyContent="space-between" alignItems="center">
                    <Typography sx={{ fontWeight: 500 }} variant="h3">
                        Upload Document
                    </Typography>
                </Box>
            </Box>
            <Divider sx={{ my: 2 }} />
            <Box sx={{ width: "100%", display: "flex", justifyContent: "center", mt: 4 }}>
                <Paper sx={{ width: "100%", p: 4, boxShadow: 3, borderRadius: 2 }}>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <Grid container spacing={2}>
                            {/* Document Name */}
                            <Grid item xs={12} sm={4}>
                                <TextField
                                    fullWidth
                                    label="Document Name"
                                    {...register("documentName", { required: "Document Name is required" })}
                                    error={!!errors.documentName}
                                    helperText={errors.documentName?.message}
                                />
                            </Grid>

                            {/* Document Type */}
                            <Grid item xs={12} sm={4}>
                                <TextField
                                    fullWidth
                                    select
                                    label="Document Type"
                                    {...register("documentType", { required: "Document Type is required" })}
                                    error={!!errors.documentType}
                                    helperText={errors.documentType?.message}
                                >
                                    <MenuItem value="pdf">PDF</MenuItem>
                                    <MenuItem value="word">Word Document</MenuItem>
                                    <MenuItem value="image">Image</MenuItem>
                                </TextField>
                            </Grid>

                            {/* Document Category */}
                            <Grid item xs={12} sm={4}>
                                <TextField
                                    fullWidth
                                    label="Category"
                                    {...register("category", { required: "Category is required" })}
                                    error={!!errors.category}
                                    helperText={errors.category?.message}
                                />
                            </Grid>

                            {/* File Upload Field (Textbox + Button) */}
                            <Grid item xs={12} sm={12}>
                                <TextField
                                    fullWidth
                                    label="Uploaded File"
                                    value={selectedFile ? selectedFile.name : ""}
                                    InputProps={{
                                        readOnly: true,
                                        endAdornment: (
                                            <InputAdornment position="end">
                                                <input
                                                    type="file"
                                                    accept=".pdf, .doc, .docx, .jpg, .png"
                                                    onChange={handleFileChange}
                                                    style={{ display: "none" }}
                                                    id="upload-file"
                                                />
                                                <label htmlFor="upload-file">
                                                    <Button variant="contained" component="span" color="primary">
                                                        Upload
                                                    </Button>
                                                </label>
                                            </InputAdornment>
                                        ),
                                    }}
                                />
                            </Grid>

                            {/* Submit Button */}
                            <Grid item xs={12}>
                                <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 2 }}>
                                    Submit
                                </Button>
                            </Grid>
                        </Grid>
                    </form>
                </Paper>
            </Box>
        </>
    );
};

export default UploadDocument;
