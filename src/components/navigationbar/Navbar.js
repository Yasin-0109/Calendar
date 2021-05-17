import React from 'react'
import {
    Nav,
    NavLink,
    NavMenu
    } from './NavbarElements';

const Navbar = () => {
    return (
            <Nav>
                <NavMenu>
                    <NavLink to="/calendar" activeStyle >
                        Calendar
                    </NavLink>
                    <NavLink to="/profile" activeStyle >
                        Profile
                    </NavLink>
                </NavMenu>
            </Nav>
    );
};

export default Navbar
