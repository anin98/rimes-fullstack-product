import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Use useNavigate instead of useHistory
import { TextField, Button, Box, Typography } from '@mui/material';
import './ProductForm.css'; // Import the CSS file

const ProductForm = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const navigate = useNavigate(); // Initialize useNavigate

  const handleSubmit = (e) => {
    e.preventDefault();

    const productData = {
      name,
      description,
      price
    };

    axios.post('http://127.0.0.1:8000/api/uploadproduct/', productData)
      .then(response => {
        console.log('Product uploaded successfully:', response.data);
        // Redirect to product list or another page
        navigate('/'); // Adjust the path as needed
      })
      .catch(error => console.error('Error uploading product:', error));
  };

  return (
    <Box className="form-container">
      <Typography variant="h4" className="form-header">Upload Product</Typography>
      <form onSubmit={handleSubmit} className="product-form">
        <TextField
          label="Product Name"
          variant="outlined"
          fullWidth
          margin="normal"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <TextField
          label="Description"
          variant="outlined"
          fullWidth
          margin="normal"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
        <TextField
          label="Price"
          variant="outlined"
          fullWidth
          margin="normal"
          type="number"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          required
        />
        <Button
          variant="contained"
          color="primary"
          type="submit"
        >
          Submit
        </Button>
      </form>
    </Box>
  );
};

export default ProductForm;
