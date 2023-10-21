import React, { useState } from 'react';
import Navbar from '@/components/navbar';
import axios from 'axios';

const Submit = () => {
  const [formData, setFormData] = useState({
    id: '',
    title: '',
    author: '',
    date: '',
    se_practice: '',
    claim: '',
    result_of_evidence: '',
    type_of_research: '',
    approved: false,
    checked: false,
    details: '',
    grade: '',
  });

  const dotenv = require("dotenv");
  dotenv.config();

  const backendURL = process.env.NEXT_PUBLIC_BACKENDURL;

  function generateUniqueID() {
    // Generate a timestamp
    const timestamp = new Date().getTime();
  
    // Generate a random number
    const random = Math.floor(Math.random() * 1000);
  
    // Combine the timestamp and random number to create a unique ID
    const uniqueID = `${timestamp}${random}`;
  
    return uniqueID;
  }

  const submitData = async (e: { preventDefault: () => void; }) => {
    e.preventDefault(); // Prevent the default form submission behavior

    try {
      // Make a POST request to API endpoint
      formData.id = generateUniqueID();
      console.log(formData);
      const response = await axios.post(`${backendURL}/api/submit`, formData);

      console.log(response.data);

    } catch (error) {
      console.error('Error submitting data:', error);
      // Handle the error or show an error message
    }
  };

  const handleInputChange = (e: { target: { name: any; value: any; }; }) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div id="submitModal" className="">
      <Navbar />
      <div className="modal-content">
        <form id="submitForm">
          <input
            type="text"
            placeholder="Title"
            name="title"
            value={formData.title}
            onChange={handleInputChange}
            required
          />
          <input
            type="text"
            placeholder="Authors"
            name="author"
            value={formData.author}
            onChange={handleInputChange}
            required
          />
          <input
            type="text"
            placeholder="Date"
            name="date"
            value={formData.date}
            onChange={handleInputChange}
            required
          />
          <input
            type="text"
            placeholder="SE Practice"
            name="se_practice"
            value={formData.se_practice}
            onChange={handleInputChange}
            required
          />
          <input
            type="text"
            placeholder="Claim"
            name="claim"
            value={formData.claim}
            onChange={handleInputChange}
            required
          />
          <input
            type="text"
            placeholder="Result of Evidence"
            name="result_of_evidence"
            value={formData.result_of_evidence}
            onChange={handleInputChange}
            required
          />
          <input
            type="text"
            placeholder="Type of Research"
            name="type_of_research"
            value={formData.type_of_research}
            onChange={handleInputChange}
            required
          />
          <textarea
            placeholder="Details"
            name="details"
            value={formData.details}
            onChange={handleInputChange}
            required
          ></textarea>
          <button onClick={submitData}>Submit Article</button>
        </form>
      </div>
    </div>
  );
};

export default Submit;
