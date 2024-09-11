import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './UpdateProduct.css';

const UpdateProductForm = () => {
  const [product, setProduct] = useState({ name: '', description: '', price: '' });
  const [originalProduct, setOriginalProduct] = useState({ name: '', description: '', price: '' });
  const { id } = useParams();
  const navigate = useNavigate();

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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct(prevProduct => ({ ...prevProduct, [name]: value }));
  };

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
        setTimeout(() => navigate('/'), 2000); // Navigate after 2 seconds to allow the message to be seen
      })
      .catch(error => {
        console.error('Error updating product:', error);
        toast.error('Error updating product.');
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
          />
        </div>
        <div>
          <label htmlFor="description">Description:</label>
          <textarea
            id="description"
            name="description"
            value={product.description}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="price">Price:</label>
          <input
            type="number"
            id="price"
            name="price"
            value={product.price}
            onChange={handleChange}
          />
        </div>
        <button type="submit">Update Product</button>
      </form>
      <ToastContainer />
    </div>
  );
};

export default UpdateProductForm;
