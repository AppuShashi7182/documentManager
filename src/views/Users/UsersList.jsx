import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

// material-ui
import { Breadcrumbs, Typography, Button, Stack, Box, Divider, IconButton } from '@mui/material';
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

// project import
import Breadcrumb from 'component/Breadcrumb';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
    },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
        border: 0,
    },
}));

function createData(name, age, gender, email, username) {
    return { name, age, gender, email, username };
}

const rows = [
    createData('Snow', 45, 'Male', 'abc@xyz.com', 'User1'),
    createData('Stark', 35, 'Male', '123@abc.com', 'User2'),
    createData('Maria', 48, 'Female', 'xyz@qqq.com', 'User3'),
    createData('Ric', 22, 'Male', 'sample@abc.com', 'User4'),
    createData('Emma', 66, 'Female', 'abc@xyz.com', 'User5'),
];

const UsersList = () => {

    const navigate = useNavigate(); // Hook for navigation

    const handleAddUser = () => {
        navigate("/add-edit-user"); // Navigate to Add/Edit User Page
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
                        Users
                    </Typography>
                </Breadcrumbs>

                {/* Title + Button in One Line */}
                <Box display="flex" justifyContent="space-between" alignItems="center">
                    <Typography sx={{ fontWeight: 500 }} variant="h3">
                        Users
                    </Typography>
                    <Button variant="contained" color="primary" onClick={handleAddUser}>
                        Add User
                    </Button>
                </Box>
            </Box>
            <Divider sx={{ my: 2 }} />
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 700 }} aria-label="customized table">
                    <TableHead>
                        <TableRow>
                            <StyledTableCell>Name</StyledTableCell>
                            <StyledTableCell align="right">Age</StyledTableCell>
                            <StyledTableCell>Gender</StyledTableCell>
                            <StyledTableCell>Email</StyledTableCell>
                            <StyledTableCell>Username</StyledTableCell>
                            <StyledTableCell>Actions</StyledTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows.map((row) => (
                            <StyledTableRow key={row.name}>
                                <StyledTableCell component="th" scope="row">
                                    {row.name}
                                </StyledTableCell>
                                <StyledTableCell align="right">{row.age}</StyledTableCell>
                                <StyledTableCell>{row.gender}</StyledTableCell>
                                <StyledTableCell>{row.email}</StyledTableCell>
                                <StyledTableCell>{row.username}</StyledTableCell>
                                <StyledTableCell>
                                    <IconButton color="primary">
                                        <Edit />
                                    </IconButton>
                                    <IconButton color="error">
                                        <Delete />
                                    </IconButton>
                                </StyledTableCell>
                            </StyledTableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    );
};

export default UsersList;
