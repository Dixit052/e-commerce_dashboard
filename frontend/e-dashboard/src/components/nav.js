import React from 'react'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom';
export default function Nav() {
  const navigate = useNavigate();
  const auth = localStorage.getItem("auth");
  const logout = () => {
    localStorage.clear();
    navigate("/signup");

  }
  return (
    <ul className='nav'>
      <li><Link to="/">Products </Link>  </li>
      <li> <Link to="/add">Add Products </Link>  </li>
      <li> <Link to="/update">Update Products </Link>  </li>
      <li> <Link to="/profile">Profile </Link>  </li>
      {auth ? <li> <Link onClick={logout} to="/signup">Logout </Link> </li> :
        <>
          <li> <Link to="/signup"> Signup  </Link></li>
          <li> <Link to="/login"> Login </Link> </li>
        </>
      }
    </ul>
  )
}
