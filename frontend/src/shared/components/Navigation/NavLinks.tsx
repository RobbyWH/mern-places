import React from 'react';
import { NavLink } from 'react-router-dom';
import { AuthContext } from '../../context/authContext';
import './NavLinks.css';

const NavLinks = () => {
  const auth = React.useContext(AuthContext);
  return (
   <ul className="nav-links">
     <li>
       <NavLink to="/" exact>ALL USERS</NavLink>
     </li>
     {auth.isLoggedIn && (
       <>
        <li>
          <NavLink to={`/${auth.userId}/places`}>MY PLACES</NavLink>
        </li>
        <li>
          <NavLink to="/places/new">ADD PLACE</NavLink>
        </li>
      </>
     )}
     {!auth.isLoggedIn && (
        <li>
          <NavLink to="/auth">AUTHENTICATE</NavLink>
        </li>
     )}
     {auth.isLoggedIn && (
        <li>
          <button onClick={auth.logout}>LOGOUT</button>
        </li>
     )}
    </ul>
  )
}

export default NavLinks;