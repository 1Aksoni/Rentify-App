import React, { useState } from 'react';
import '../styles/propertyitemcard.css';
import axios from 'axios';
import { jwtDecode } from "jwt-decode";
const PropertyItemCard = ({ property }) => {
  const [showDetails, setShowDetails] = useState(false);
  const [showOwnerDetails, setShowOwnerDetails] = useState(false);

  const [liked, setLiked] = useState(false);
  const [interested, setInterested] = useState(false);
  const toggleDetails = () => {
    setShowDetails(!showDetails);
  };

 

  const handleLike = async (id) => {
    setLiked(!liked);
    
    }



    const handleInterest = async () => {
        try {
          // Make POST request to backend with property data
          const response= await  axios.post('api/v1/buyer/send-mail', {propertyData:property}, {
        headers: {
          'Content-Type': 'application/json',
           Authorization: localStorage.getItem('token'),
        },
      });
    
      if(response.status === 200){
        alert("Email Send Succesfull");
      }
      else{
        alert("Some error while sending the mail please try again");
      }
         
        } catch (error) {
          console.error('Error sending interest:', error);
          // Handle error if needed
          alert("Some server error while sending the mail please try again");
        }
      };
    
  return (
    <div className="property-item">
      <div className="property-image">
        <img src={property.image} alt={property.name} />
      </div>
      <div className="property-details">
        <h2>{property.name}</h2>
        <p>{property.description}</p>
        <p>
          <strong>Location:</strong> {property.place}, {property.city}, {property.state}, {property.country}
        </p>
        <p>
          <strong>Price:</strong> {property.price}
        </p>
        <div className="property-actions">
          <button onClick={toggleDetails}>{showDetails ? 'Hide Details' : 'Show More Details'}</button>
          <button onClick={()=>handleLike(property._id)}>
            {liked ? <span>&#9829;</span> : <span>&#9825;</span>} Like
          </button>
        </div>
        {showDetails && (
          <div className="owner-details">
            <h3>Owner Details</h3>
            <p><strong>Name:</strong> {property.owner.firstname} {property.owner.lastname}</p>
            <p><strong>Mobile:</strong> {property.owner.phone}</p>
            <p><strong>Email:</strong> {property.owner.email}</p>
            <div className="owner-actions">
             
              <button onClick={handleInterest}>I am Interested</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PropertyItemCard;
