import { useState } from 'react'
import './App.css'
import axios from 'axios'
function App() {
  const[formData, setFormData] = useState({
    username: '',
    password: ''
  })

  const handleChange = (e) =>{
    setFormData({ ...formData , [e.target.name]: e.target.value})
  }

  const handleSubmit = async (e) =>{
    e.preventDefault()
    try {
      const res = await axios.post("http://localhost:5000/user",formData)      
      console.log('Server response:', res.data);
      alert('Data posted successfully!');
      // Reset form
      setFormData({ username: '', password:'' });
    } catch (error) {
      console.error(error)
    }
  }
  return (
    <>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name='username'
          value={formData.username}
          onChange={handleChange}
        />
        <input
          type="text"
          name='password'
          value={formData.password}
          onChange={handleChange}
        />
        <button type="submit">add</button>
      </form>
    </>
  )
}
export default App
