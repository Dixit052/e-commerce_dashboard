import React from 'react';
import './App.css';
import { BrowserRouter,Routes,Route } from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Nav from './components/nav';
import Footer from './components/footer';
import Addproduct from './components/addProduct';
import UpdateProduct from './components/updateProduct';
import Profile from './components/profile';
import Products from './components/products';
import SignUp from './components/signUp';
import privateComponent from './components/privateComponent';
import Login from './components/login';
function App() {
  return (
    <div className="App">
       
       <BrowserRouter>
        <Nav />
        <ToastContainer />
          <Routes>
             <Route Component={privateComponent}>
              <Route path='/' Component= { Products} />
              <Route path='/add'  Component={ Addproduct } />
              <Route path='/update/:id'  Component={UpdateProduct} />
              <Route path='/profile'  Component={Profile} />
              </Route> 
            <Route path= '/signup' Component={SignUp} /> 
            <Route path='/login' Component={Login}/>
           </Routes>
          <Footer/>
       </BrowserRouter>
      
       
       
    </div>
  );
}

export default App;
