import { Fragment, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import "../CSS/Navbar.css";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import VisitCount from "./VisitCount";


const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

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
            <h3 style={{ marginTop: "1rem" }}>
              SPECTASTYLE
              <br />
              <span>Shop With Us</span>
            </h3>
          </div>
          <div className="routes">
            <ul className={`navbar_list ${menuOpen ? "menu-opens" : ""}`}>
              <li>
                <NavLink
                  to="/"
                  id="nav-hov"
                  style={{ color: "#460B46", textDecoration: "none" }}
                >
                  Home
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/about"
                  id="nav-hov"
                  style={{ color: "#460B46", textDecoration: "none" }}
                >
                  About
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/product"
                  id="nav-hov"
                  style={{ color: "#460B46", textDecoration: "none" }}
                >
                  Products
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/contact"
                  id="nav-hov"
                  style={{ color: "#460B46", textDecoration: "none" }}
                >
                  Contact
                </NavLink>
              </li>
              <li>
                <NavLink to="/cart">
                  <ShoppingCartIcon
                    className="btn"
                    style={{ color: "#460B46", marginLeft: "5rem"}}
                  />
                </NavLink>
              </li>
              <li>
                <NavLink to="/profile">
                  <AccountBoxIcon
                    className="btn1"
                    style={{ color: "#460B46" }}
                  />
                </NavLink>
              </li>

              <li>
              <VisitCount></VisitCount>
              </li>
              

            </ul>

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
        </div>
      </nav>
    </Fragment>
  );
};

export default Navbar;
