import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';

export default function Products() {

  const [product, setProduct] = useState([])


  useEffect(() => {
   
    fetchData();

  }, []);
  const fetchData = async () => {
    let respone = await fetch('http://localhost:5000/product',{
      headers:{
        authorization : localStorage.getItem('auth')
      }
    });
    respone = await respone.json();
    setProduct(respone);
  }

  const Delete = async(id)=>{
           let res  = await fetch(`http://localhost:5000/product/${id}`,{
            method:"DELETE"
           });
           fetchData(); 
  }
 
  const handleSearch =(event)=>{
    let key = event.target.value;
    if(key){
        searchProduct(key);
    }
    else {
      fetchData();
    }
  }
 const searchProduct = async (key)=>{
    let result = await fetch(`http://localhost:5000/search/${key}`);
    result = await result.json();
    // console.log(result);
    setProduct(result);

 }


  return (
    <div className='container-prod'>
      <h2>Product List</h2>
      <input id='search-bar' type='text'  placeholder='Search Product'  onChange={handleSearch} />
      <ul  className='list-head'>
        <li>S.No.</li>
        <li>Product Name</li>
        <li>Price</li>
        <li>Category</li>
        <li>Comapany</li>
        <li>Operation</li>
      </ul>
      {
        product.length>0?
        product.map((item, index) =>
          <ul className='list-entry' key={index}  >
            <li >{index + 1}</li>
            <li  >{item.name}</li>
            <li >{item.price}</li>
            <li >{item.category}</li>
            <li >{item.company}</li>
            <li>
              <button onClick={()=> Delete(item._id)} >Delete</button>
              <Link to={`/update/${item._id}`}  ><button style={{marginLeft:"5px"}}>Update</button></Link>

            </li>
          </ul>
        ):
        <h3>No record Found</h3>
      }



    </div>
  )
}
