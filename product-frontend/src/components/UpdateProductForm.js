import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './UpdateProduct.css';

const UpdateProductForm = () => {
  const [product, setProduct] = useState({ name: '', description: '', price: '' });
  const [originalProduct, setOriginalProduct] = useState({ name: '', description: '', price: '' });
  const [errors, setErrors] = useState({});
  const { id } = useParams();
  const navigate = useNavigate();

  // Fetch the product data when the component loads
  useEffect(() => {
    axios.get(`http://127.0.0.1:8000/api/product/${id}/`)
      .then(response => {
        setProduct(response.data);
        setOriginalProduct(response.data);
      })
      .catch(error => {
        console.error('Error fetching product:', error);
        toast.error('Error fetching product details.');
      });
  }, [id]);

  // Handle input field changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct(prevProduct => ({ ...prevProduct, [name]: value }));
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    // Prepare payload with only modified fields
    const updatedFields = {};
    for (const key in product) {
      if (product[key] !== originalProduct[key]) {
        updatedFields[key] = product[key];
      }
    }

    axios.put(`http://127.0.0.1:8000/api/product/${id}/`, updatedFields)
      .then(() => {
        toast.success('Product updated successfully!');
        setErrors({});
        setTimeout(() => navigate('/'), 2000); // Navigate after 2 seconds to allow the message to be seen
      })
      .catch(error => {
        // Debugging: Log the full error response to understand the structure
        console.log('Full error response:', error.response);

        if (error.response && error.response.status === 400) {
          const backendErrors = error.response.data; // Capture backend validation errors

          setErrors(backendErrors); // Store errors for form display

          // Handle specific field errors, e.g., for "price"
          if (backendErrors.price) {
            toast.error(`Validation error: ${backendErrors.price[0]}`);
          } else {
            toast.error('Validation error: Please fix the highlighted fields.');
          }
        } else {
          console.error('Error updating product:', error);
          toast.error('Error updating product.');
        }
      });
  };

  return (
    <div className="update-form-container">
      <h1 className="update-form-header">Update Product</h1>
      <form onSubmit={handleSubmit} className="update-product-form">
        <div>
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={product.name}
            onChange={handleChange}
            className={errors.name ? 'input-error' : ''}
          />
          {errors.name && <span className="error-message">{errors.name[0]}</span>}
        </div>
        <div>
          <label htmlFor="description">Description:</label>
          <textarea
            id="description"
            name="description"
            value={product.description}
            onChange={handleChange}
            className={errors.description ? 'input-error' : ''}
          />
          {errors.description && <span className="error-message">{errors.description[0]}</span>}
        </div>
        <div>
          <label htmlFor="price">Price:</label>
          <input
            type="number"
            step="0.01"
            id="price"
            name="price"
            value={product.price}
            onChange={handleChange}
            className={errors.price ? 'input-error' : ''}
          />
          {errors.price && <span className="error-message">{errors.price[0]}</span>}
        </div>
        <button type="submit">Update Product</button>
      </form>
      <ToastContainer />
    </div>
  );
};

export default UpdateProductForm;
