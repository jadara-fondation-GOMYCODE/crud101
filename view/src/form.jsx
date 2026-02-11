// DataForm.jsx

import  { useState } from 'react';
import axios from 'axios';

function DataForm() {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {
      // Send a POST request to your Express server
      const response = await axios.post('http://localhost:5000/api/data', formData);

      console.log('Server response:', response.data);
      alert('Data posted successfully!');

      // Reset form
      setFormData({ username: '', email: '' });

    } catch (error) {
      console.error('Error posting data:', error.message);
      alert('Failed to post data.');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Username:</label>
        <input
          type="text"
          name="username"
          value={formData.username}
          onChange={handleChange}
        />
      </div>
      <div>
        <label>Email:</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
        />
      </div>
      <button type="submit">Submit</button>
    </form>
  );
}

export default DataForm;
