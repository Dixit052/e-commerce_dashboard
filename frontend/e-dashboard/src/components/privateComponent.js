import React from "react";
import { Navigate, Outlet } from 'react-router-dom';


export default function privateComponent() {
    const auth  = localStorage.getItem('auth');
  return auth?<Outlet/>:<Navigate to="/signup"/>;
}
