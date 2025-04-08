import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

// material-ui
import { Breadcrumbs, Grid, Card, CardContent, Typography, Button, Stack, Box, Divider, IconButton } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { DataGrid } from '@mui/x-data-grid';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

import { Edit, Delete } from "@mui/icons-material";
import { Description, PictureAsPdf, InsertDriveFile, Image } from "@mui/icons-material";

// project import
import Breadcrumb from 'component/Breadcrumb';

const documents = [
    { name: "Report.pdf", icon: <PictureAsPdf />, color: "primary" },
    { name: "Invoice.docx", icon: <InsertDriveFile />, color: "secondary" },
    { name: "Presentation.ppt", icon: <Description />, color: "success" },
    { name: "Image.png", icon: <Image />, color: "error" },
];

const Documents = () => {

    const navigate = useNavigate(); // Hook for navigation

    const handleAddDocument = () => {
        navigate("/upload-document"); // Navigate to Upload Document Page
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
                        Documents
                    </Typography>
                </Breadcrumbs>

                {/* Title + Button in One Line */}
                <Box display="flex" justifyContent="space-between" alignItems="center">
                    <Typography sx={{ fontWeight: 500 }} variant="h3">
                        Documents
                    </Typography>
                    <Button variant="contained" color="primary" onClick={handleAddDocument}>
                        Upload Document
                    </Button>
                </Box>
            </Box>
            <Divider sx={{ my: 2 }} />
            <Grid container spacing={2}>
                {documents.map((doc, index) => (
                    <Grid item xs={12} sm={6} md={3} key={index}>
                        <Card sx={{ backgroundColor: "#f9f9f9", boxShadow: 2 }}>
                            <CardContent>
                                <Grid container justifyContent="space-between" alignItems="center">
                                    {/* Left Section - Document Name */}
                                    <Grid item>
                                        <Typography
                                            variant="h6"
                                            sx={{ color: (theme) => theme.palette[doc.color].main }}
                                        >
                                            {doc.name}
                                        </Typography>
                                    </Grid>
                                    {/* Right Section - Icon */}
                                    <Grid item>
                                        <Typography
                                            variant="h4"
                                            sx={{ color: (theme) => theme.palette[doc.color].main }}
                                        >
                                            {doc.icon}
                                        </Typography>
                                    </Grid>
                                </Grid>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </>
    );
};

export default Documents;
