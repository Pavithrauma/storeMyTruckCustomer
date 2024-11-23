import React from 'react';
import { ErrorMessage } from 'formik';
import { Button, Grid, Typography, IconButton } from '@mui/material';
import { Delete as DeleteIcon } from '@mui/icons-material';

const FileUploadField = ({ field, form: { setFieldValue }, label, ...props }) => {
  const handleFileChange = (event) => {
    const file = event.currentTarget.files[0];
    setFieldValue(field.name, file); // Store the file in Formik state
    props.onFileSelect(file); // Call the external file select handler (if any)
  };

  const handleDeleteFile = () => {
    setFieldValue(field.name, null); // Remove the file from Formik state
  };

  return (
    <Grid container spacing={2} alignItems="center">
      <Grid item xs={12}>
        <Typography variant="subtitle1">{label}</Typography>
      </Grid>

      <Grid item xs={12}>
        <input
          type="file"
          onChange={handleFileChange}
          style={{ display: 'none' }} // Hide default file input
          id={field.name}
          accept=".jpg, .jpeg, .png, .pdf" // Specify accepted file types
        />
        <label htmlFor={field.name}>
          <Button variant="contained" component="span">
            Choose File
          </Button>
        </label>
      </Grid>

      {field.value && (
        <Grid item xs={12}>
          <div style={{ border: "2px solid red", borderStyle: "dashed", marginRight: "17px" }}>
            <span style={{ color: 'black' }}>{field.value.name}</span> {/* File name in black */}
            <IconButton aria-label="delete" onClick={handleDeleteFile}>
              <DeleteIcon sx={{ color: 'black' }} />
            </IconButton>
          </div>
        </Grid>
      )}

      <Grid item xs={12}>
        <ErrorMessage name={field.name} component="div" className="invalid-feedback" sx={{ color: 'black' }} />
      </Grid>
    </Grid>
  );
};

export default FileUploadField;
