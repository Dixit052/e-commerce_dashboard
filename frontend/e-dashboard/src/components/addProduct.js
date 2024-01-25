import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
export default function Addproduct() {
  const navigate  = useNavigate();
  const [productData , setproductData]  = useState({
    name :'',
    price:'',
    category:'select-category',
    company:''
  })

  const handleChange = (e) => {
    const { name, value } = e.target;
    setproductData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  

  const handleSubmit = async (e) => {
    

    e.preventDefault();
     
    try {
      const response  = await fetch("http://localhost:5000/add-product",{
      method : "POST",
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
          name: productData.name,
          price :productData.price,
          category:productData.category,
          company:productData.company,
          userId : "65a7ca6af450e39df08007d7"

      })
    })
     const result = await response.json();
     console.log(result);
     setproductData({
      name:'',
      price:'',
      category:'select-category',
      company:''
     })
     toast.success('Product Added successfully!', {
      position:'bottom-right',
      autoClose: 3000, // Close the notification after 3 seconds
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    });
    
  }
     catch (error) {
          console.log(error);
    }
  
    
     





  }
  return (
    <>
      <form onSubmit={handleSubmit} className='form-ui' >
        <h2 style={{ textAlign: "center" }}>Add Product</h2>
        <input type='text' name='name' placeholder='Product Name' value={productData.name} onChange={handleChange} required={true} />
        <input type='number' name='price' placeholder='Price'value={productData.price}  onChange={handleChange} required={true}   />
        <select name='category' value={productData.category} onChange={handleChange} required={true}  >
          <option value="category">select-category</option>
          <option value="electronics" >Electronics</option>
          <option value="automobile">Automobile</option>
          <option value="cloths">Cloths</option>
        </select>
        <input type='text' name='company' placeholder='Company Name'value={productData.company}  onChange={handleChange}  required={true} />
        <button className='button'>Add</button>
      </form>

    </>
  )
}
