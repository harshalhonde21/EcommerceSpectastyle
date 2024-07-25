import { Fragment, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import "../CSS/Navbar.css";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import VisitCount from "./VisitCount";
import Logo from './assests/Logo.png';
import Logo1 from './assests/Logo1.png';
import Logo2 from './assests/Logo2.png';
import React, { useContext } from 'react';
import { useCart } from './CartContext'
const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const { cart } = useCart();
  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const navigate = useNavigate()

  const goHome = () => {
    navigate('/')
  }

  return (
    <Fragment>
      <nav>
        <div className={`main-component ${menuOpen ? "menu-open show" : ""}`}>
          <div className="head-main" onClick={goHome}>
            {/* my image of logo is in components folder */}
            <img src={Logo2} alt="logo" className="logo" />

          </div>
          <div className="routes">
            <ul className={`navbar_list ${menuOpen ? "menu-opens" : ""}`}>
              <li>
                <NavLink
                  to="/"
                  id="nav-hov"
                  style={{ color: "#460B46", textDecoration: "none" }}
                  onClick={toggleMenu}
                >
                  Home
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/about"
                  id="nav-hov"
                  style={{ color: "#460B46", textDecoration: "none" }}
                  onClick={toggleMenu}
                >
                  About
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/product"
                  id="nav-hov"
                  style={{ color: "#460B46", textDecoration: "none" }}
                  onClick={toggleMenu}
                >
                  Products
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/contact"
                  id="nav-hov"
                  style={{ color: "#460B46", textDecoration: "none" }}
                  onClick={toggleMenu}
                >
                  Contact
                </NavLink>
              </li>
              <li className="cart-cont">
                <NavLink to="/cart">
                  <ShoppingCartIcon
                    className="btn"
                    style={{ color: "#460B46", marginLeft: "1rem" }}
                    onClick={toggleMenu}
                  />
                </NavLink>
                <span className="cart-value">{cart.length}</span>
              </li>
              <li>
                <NavLink to="/profile">
                  <AccountBoxIcon
                    className="btn1"
                    style={{ color: "#460B46" }}
                    onClick={toggleMenu}
                  />
                </NavLink>
              </li>

              <li>
                <VisitCount></VisitCount>
              </li>


            </ul>
          </div>
          <div className="button" onClick={toggleMenu}>
            {menuOpen ? (
              <CloseIcon
                className="icon1"
                style={{ fontSize: "2rem", color: "rgb(70, 11, 70)" }}
              />
            ) : (
              <MenuIcon
                style={{
                  fontSize: "2rem",
                  color: "rgb(70, 11, 70)",
                  zIndex: "-1",
                }}
              />
            )}
          </div>
        </div>
      </nav>
    </Fragment>
  );
};

export default Navbar;

