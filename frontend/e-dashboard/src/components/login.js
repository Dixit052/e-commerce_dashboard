import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
export default function Login() {
  const navigate = useNavigate();
  const auth = localStorage.getItem("auth");
  useEffect(() => {
    if (auth) navigate("/")
  })

  const [FormData, setFormData] = useState({
    email: '',
    password: ''
  })
  const handleSubmit = async (e) => {
    e.preventDefault();


    try {
      // Make a POST request using the Fetch API
      const response = await fetch('http://localhost:5000/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          // Add any additional headers if needed
        },
        body: JSON.stringify({
          email: FormData.email,
          password: FormData.password
        }),


      });
      const responseData = await response.json();


      if (!response.ok) {
        alert(responseData.message);
        return;
        // throw new Error('Network response was not ok');
      }

      setFormData({
        email: '',
        password: '',
      });
      localStorage.setItem("auth", responseData.auth);
      navigate('/');


    } catch (error) {
      console.error('Error during registration:', error.message);

    }


  };


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <>
      <h2 style={{ textAlign: 'center' }}>Login</h2>
      <form onSubmit={handleSubmit} className='form-ui' >
        <input type='email' name='email' value={FormData.email} placeholder='example@gmail.com' onChange={handleChange} />
        <input type='password' name='password' value={FormData.password} placeholder='Password' onChange={handleChange} />
        <button id='button' type='submit'>Login</button>


      </form>
    </>


  )
}
