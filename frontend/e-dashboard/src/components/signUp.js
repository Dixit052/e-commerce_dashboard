import React, { forwardRef, useEffect } from 'react'
import { useState } from 'react'
import { json } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
export default function SignUp() {
  const navigate = useNavigate();
  useEffect(() => {
      const auth = localStorage.getItem('user');
      if(auth){
        navigate('/');
      }
  }

  )


 
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();


    try {
      // Make a POST request using the Fetch API
      const response = await fetch('http://localhost:5000/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          // Add any additional headers if needed
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          password: formData.password
        }),


      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      // Handle the response data
      const responseData = await response.json();
      const user = {
        name: formData.name,
        email: formData.email
      }
      setFormData({
        name: '',
        email: '',
        password: '',
      });
      localStorage.setItem("user", JSON.stringify(user));
      navigate('/');


    } catch (error) {
      console.error('Error during registration:', error.message);
      // Handle errors, show a message to the user, etc.
    }




    // Reset the form after submission

  };


  return (
    <>
      <h2 style={{ textAlign: 'center' }}>Register</h2>
      <form onSubmit={handleSubmit} className='form-ui'>
        <input type='text' name='name' placeholder='Name' value={formData.name} onChange={handleChange} />
        <input type='email' name='email' placeholder='example@gmail.com' value={formData.email} onChange={handleChange} />
        <input type='password' name='password' placeholder='password' value={formData.password} onChange={handleChange} />

        <button id='button' type="submit">Submit</button>

      </form>

    </>

  )
}
