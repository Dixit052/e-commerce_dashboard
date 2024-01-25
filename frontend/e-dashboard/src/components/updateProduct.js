import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify';
import { useNavigate, useParams } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
export default function UpdateProduct() {
  const navigate  = useNavigate();
  const params = useParams();
  const id = params.id;

  const [productData, setproductData] = useState({
    name: '',
    price: '',
    category: 'select-category',
    company: ''
  })

  useEffect(() => {
    getData(id);
  },[])
  const getData = async (id) => {
    let response = await fetch(`http://localhost:5000/product/${id}`);
    response = await response.json();
    setproductData({
      name: response.name,
      price: response.price,
      category: response.category,
      company: response.company
    })
  }


  const handleChange = (e) => {
    const { name, value } = e.target;
    setproductData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };


  const handleSubmit = async (e) => {

    e.preventDefault();
    //console.log(productData);
    try {
      let result  = await fetch(`http://localhost:5000/product/${id}`,{
         method:"PUT",
         headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(
            productData
        )
      })
       result = await result.json();
     
       
      toast.success('Product updated successfully!', {
        position: 'bottom-right',
        autoClose: 3000, // Close the notification after 3 seconds
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
      navigate("/");
    }
    catch (error) {
      console.log(error);
    }

  }
  return (
    <div style={{ textAlign: "center" }}>
      <h2>Update Product Details</h2>
      <form onSubmit={handleSubmit} className='form-ui' >
        <input type='text' name='name' placeholder='Product Name' value={productData.name} onChange={handleChange} required={true} />
        <input type='number' name='price' placeholder='Price' value={productData.price} onChange={handleChange} required={true} />
        <select name='category' value={productData.category} onChange={handleChange} required={true}  >
          <option value="category">select-category</option>
          <option value="electronics" >Electronics</option>
          <option value="automobile">Automobile</option>
          <option value="cloths">Cloths</option>
        </select>
        <input type='text' name='company' placeholder='Company Name' value={productData.company} onChange={handleChange} required={true} />
        <button style={{ marginLeft: "10px" }} >Update</button>
      </form>

    </div>
  )
}
