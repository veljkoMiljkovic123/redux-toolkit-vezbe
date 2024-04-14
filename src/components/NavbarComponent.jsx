import React from "react";
import { NavLink } from "react-router-dom";

function NavbarComponent() {
  return (
    <div className="container mx-auto flex items-center justify-between h-[120px]">
      <h1 className="text-blue-400 uppercase text-2xl font-bold">Redux</h1>
      <ul className="flex gap-5">
        <li>
          <NavLink to={"/"} className='text-blue-300 text-[20px] hover:text-blue-600'>Home</NavLink>
        </li>
        {localStorage.hasOwnProperty('redux_user')?(<li>
          <NavLink to={"/profile"} className='text-blue-300 text-[20px] hover:text-blue-600'>Profile</NavLink>
        </li>):(  <li>
          <NavLink to={"/register"} className='text-blue-300 text-[20px] hover:text-blue-600'>Register</NavLink>
        </li>)}
      
        
      </ul>
    </div>
  );
}

export default NavbarComponent;
