import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

// material-ui
import { Breadcrumbs, Grid, Card, CardContent, Typography, Button, Stack, Box, Divider, IconButton, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, TextField } from '@mui/material';
import { Delete } from "@mui/icons-material";
import { Description, PictureAsPdf, InsertDriveFile, Image } from "@mui/icons-material";

// project import
import Breadcrumb from 'component/Breadcrumb';
import { getDocuments as fetchDocuments, deleteDocument } from 'services/document.service';
import SupervisedUserCircleIcon from '@mui/icons-material/SupervisedUserCircle';
import Swal from 'sweetalert2';



class DocumentsView extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            documents: [],
            isPopUpOpen: false,
            selectedDocument: null
        };
    }

    async componentDidMount() {
        this.getDocuments(); // Fetch documents when the component mounts
    }

    async componentDidUpdate(prevProps) {
        if (this.props.location !== prevProps.location) {
            this.getDocuments(); // Fetch documents when the component updates
        }
    }
    

    getDocuments = async () => {
        const documents = await fetchDocuments(); // Fetch documents from the service

        // Map the documents to include icons and colors
        const mappedDocuments = documents.map((doc) => {
            let icon, color;

            // get doc.type from file name extension
            const fileExtension = doc.name.split('.').pop().toLowerCase();
            doc.type = fileExtension;

            switch (fileExtension) {
                case "pdf":
                    icon = <PictureAsPdf fontSize="large" />;
                    color = "red";
                    break;
                case "jpeg":
                case "jpg":
                case "png":
                case "gif":
                    icon = <Image fontSize="large" />;
                    color = "blue";
                    break;
                case "doc":
                case "docx":
                case "txt":
                    icon = <InsertDriveFile fontSize="large" />;
                    color = "green";
                    break;
                default:
                    icon = <Description fontSize="large" />;
                    color = "grey";
                    break;
            }
            return {
                ...doc,
                type: fileExtension,
                icon: icon,
                color: color
            };
        });

        this.setState({ documents: mappedDocuments }); // Set the documents in the state
    }




    handleUploadDocument = () => {
        this.props.navigate("/upload-document"); // Navigate to Upload Document Page
    }

    handleDeleteDocument = async (document) => {
        await deleteDocument(document.id); // Call the deleteDocument function from the service
        await this.getDocuments(); // Refresh the documents list after deletion
    }

    render() {
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
                        <Button variant="contained" color="primary" onClick={this.handleUploadDocument}>
                            Upload Document
                        </Button>
                    </Box>
                </Box>
                <Divider sx={{ my: 2 }} />

                {(this.state.documents.length === 0) && (
                    <Typography variant="h3" color="text.secondary" align="center" sx={{ mt: 5 }}>
                        No documents available.
                    </Typography>
                )}

                {/* Document Cards */}
                <Grid container spacing={2}>
                    {this.state.documents.map((doc, index) => (
                        <Grid item xs={12} sm={6} md={4} lg={3} xl={3} key={index}>
                            <Card sx={{ backgroundColor: "#f9f9f9", boxShadow: 2, height: '100%' }}>
                                <CardContent sx={{ margin: 0, padding: 0, paddingBottom: '0 !important', height: '100%' }}>

                                    <Stack direction="row" alignItems="center" sx={{ height: '100%' }}>
                                        <Box display="flex" alignItems="center" sx={{padding: 1, display: 'flex', flex: 1, height: '100%'}}>
                                            <Grid item>
                                                <Typography
                                                    variant="h4"
                                                    sx={{ color: doc.color, display: "flex", alignItems: "center", mr: 2 }}
                                                >
                                                    {doc.icon}
                                                </Typography>
                                            </Grid>
                                            <Grid item>
                                                <Typography
                                                    variant="h6"
                                                    sx={{ color: doc.color, lineBreak: 'anywhere' }}
                                                >
                                                    {doc.name}
                                                </Typography>
                                            </Grid>
                                        </Box>
                                        <Box display="flex" alignItems="center" sx={{ ml: 1, justifyContent: 'center', alignItems: 'center' }}>
                                            <IconButton color="secondary"
                                                // on click, open a popup to add email
                                                onClick={() => {
                                                    this.setState({ isPopUpOpen: true, selectedDocument: doc });
                                                }}
                                                
                                            >
                                                <SupervisedUserCircleIcon style={{ height: '100%' }} />
                                            </IconButton>
                                            <IconButton color="secondary" onClick={() => this.handleDeleteDocument(doc)}>
                                                <Delete style={{ height: '100%' }} />
                                            </IconButton>
                                        </Box>
                                    </Stack>

                                </CardContent>
                            </Card>
                        </Grid>
                    ))}
                </Grid>

                {/* PopUp */}
                <Dialog open={this.state.isPopUpOpen} onClose={() => {
                    this.setState({ isPopUpOpen: false });
                }}>
                    <DialogTitle>{this.state.selectedDocument?.name}</DialogTitle>
                    <DialogContent>
                        <TextField
                            placeholder='Name'
                            label="Name"
                            variant="outlined"
                            fullWidth
                            margin="normal"
                        />
                        <TextField
                            placeholder='Email'
                            label="Email"
                            variant="outlined"
                            fullWidth
                            margin="normal"
                        />
                        <TextField
                            placeholder='Phone Number'
                            label="Phone Number"
                            variant="outlined"
                            fullWidth
                            margin="normal"
                        />
                        {/* <DialogContentText>
                            <Typography variant="h6">Document Name: {this.state.selectedDocument?.name}</Typography>
                            <Typography variant="body1">Document Type: {this.state.selectedDocument?.type}</Typography>
                        </DialogContentText> */}
                    </DialogContent>
                    
                    <DialogActions sx={{ alignItems: 'center', justifyContent: 'center', mb: 2 }}>
                        <Button onClick={() => {
                            this.setState({ isPopUpOpen: false });
                        }}>Close</Button>
                        <Button
                            onClick={() => {
                                this.setState({ isPopUpOpen: false });
                                Swal.fire({
                                    icon: 'success',
                                    title: 'Delegated Successfully',
                                    confirmButtonText: 'OK',
                                    toast: true,
                                    position: 'bottom-end',
                                    showConfirmButton: false,
                                    timer: 3000,
                                    // green background color
                                    background: '#4CAF50',
                                    color: '#fff',
                                });
                            }}
                            color="primary"
                            variant='contained'
                        >
                            Delegate
                        </Button>
                    </DialogActions>
                </Dialog>
            </>
        );
    }
};


const Documents = () => {

    const navigate = useNavigate(); // Hook for navigation

    return (
        <DocumentsView navigate={navigate} />
    );
}

export default Documents;
