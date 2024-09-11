import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Card, CardContent, Typography, Grid, Button, Box, IconButton, TextField
} from '@mui/material';
import { Link } from 'react-router-dom';
import DeleteIcon from '@mui/icons-material/Delete';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './ProductList.css';

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  // Fetch products based on search query
  useEffect(() => {
    axios.get(`http://127.0.0.1:8000/api/products/?search=${searchQuery}`)
      .then(response => setProducts(response.data))
      .catch(error => console.error('Error fetching products:', error));
  }, [searchQuery]);

  const handleDelete = (id, name) => {
    const confirmed = window.confirm('Are you sure you want to delete this product?');
    if (confirmed) {
      axios.delete(`http://127.0.0.1:8000/api/product/${id}/`)
        .then(() => {
          setProducts(products.filter(product => product.id !== id));
          toast.success(`Product "${name}" deleted successfully`);
        })
        .catch(error => console.error('Error deleting product:', error));
    }
  };

  return (
    <div className="moving-background">
      <Box style={{ padding: '20px' }}>
        
        {/* Flexbox container for header and search */}
        <Box display="flex" justifyContent="space-between" alignItems="center" marginBottom="20px">
          {/* Our Products Header */}
          <Typography variant="h4" className="products-header">
            Our Products
          </Typography>

          {/* Search Box */}
          <TextField
            label="Search by Product Name"
            variant="outlined"
            size="small"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{ width: '300px' }}
          />
        </Box>

        {/* Add New Product Button */}
        <Box display="flex" justifyContent="flex-end" marginBottom="20px">
          <Button
            className="add-product-button"
            variant="contained"
            component={Link}
            to="/add"
            style={{ height: '40px' }}
          >
            Add New Product
          </Button>
        </Box>

        {/* Product List */}
        <Grid container spacing={3}>
          {products.map(product => (
            <Grid item xs={12} sm={6} md={4} key={product.id}>
              <Card className="product-card">
                <CardContent className="card-content">
                  <Typography className="card-title" variant="h5">{product.name}</Typography>
                  <Typography className="card-description" variant="body2" paragraph>
                    {product.description}
                  </Typography>
                  <Typography className="card-price">${product.price}</Typography>
                  <Box className="card-buttons">
                    <Button
                      className="product-button"
                      variant="contained"
                      component={Link}
                      to={`/edit/${product.id}`}
                    >
                      Edit
                    </Button>
                    <IconButton
                      className="delete-button"
                      onClick={() => handleDelete(product.id, product.name)}
                      aria-label="delete"
                    >
                      <DeleteIcon />
                    </IconButton>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
        <ToastContainer />
      </Box>
    </div>
  );
};

export default ProductList;
