import React from 'react'
import { NavLink } from 'react-router-dom';

function Navbar (props) {
    if (props.loggedIn === null){
        return (
            <div>
                <NavLink to="/login">LOGIN</NavLink>
                <NavLink to="/register">REGISTER</NavLink>
            </div> 
        )
    }else{
        return (
            <div>
                <NavLink to="/" onClick={props.handleLogout}>LOGOUT</NavLink>
            </div> 
        )
    } 
}

export default Navbar

