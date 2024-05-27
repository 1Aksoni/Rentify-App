import React, { useState } from 'react';
import '../styles/addproperty.css'; 
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
const UpdateProperty = () => {

    const location = useLocation();
  const { property } = location.state || {};
  const [formData, setFormData] = useState({
    id:property._id,
    name: property.name,
    description: property.description,
    address: property.address,
    city: property.city,
    state: property.state,
    country: property.country,
    image:property.image,
    price: property.price,
    owner:property.owner
  });
  const navigate = useNavigate();
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

 

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      
      const response= await  axios.put('https://localhost:5000/api/v1/seller/update-property', formData, {
        headers: {
          'Content-Type': 'application/json',
           Authorization: localStorage.getItem('token'),
        },
      });

      if(response.status === 200){
         alert("Property Updated Succesfully");
         navigate('/view-properties');
         
      }
      else if(response.status === 401){
        alert("Erroe while updating  Property please try again");
      }
    } catch (error) {
      console.error('Property update  failed  :', error.response.data.message);
      alert('updating Property failed.');
    }
  };

  return (
    <div className="property-form-container">
      <h1>Update  Property Details</h1>
      <form onSubmit={handleSubmit} className="property-form">
        <div className="form-group">
          <label htmlFor="name">Name:</label>
          <input type="text" name="name" value={formData.name} onChange={handleChange} className="form-control" />
        </div>
        <div className="form-group">
          <label htmlFor="description">Description:</label>
          <textarea name="description" value={formData.description} onChange={handleChange} className="form-control" />
        </div>
        <div className="form-group">
          <label htmlFor="address">Address:</label>
          <input type="text" name="address" value={formData.address} onChange={handleChange} className="form-control" />
        </div>
        <div className="form-group">
          <label htmlFor="city">City:</label>
          <input type="text" name="city" value={formData.city} onChange={handleChange} className="form-control" />
        </div>
        <div className="form-group">
          <label htmlFor="state">State:</label>
          <input type="text" name="state" value={formData.state} onChange={handleChange} className="form-control" />
        </div>
        <div className="form-group">
          <label htmlFor="country">Country:</label>
          <input type="text" name="country" value={formData.country} onChange={handleChange} className="form-control" />
        </div>
        
        
        <div className="form-group">
          <label htmlFor="price">Price:</label>
          <input type="number" name="price" value={formData.price} onChange={handleChange} className="form-control" />
        </div>
        <button type="submit" className="btn btn-primary">Update</button>
      </form>
    </div>
  );
};

export default UpdateProperty;
