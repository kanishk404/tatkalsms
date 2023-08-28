import React from 'react';
import { slide as Menu } from 'react-burger-menu';
import { Link, useNavigate } from 'react-router-dom';
const Example = ({setLoggedIn,balance,isLoggedIn}) => {
  const navigate = useNavigate()
  

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    localStorage.removeItem("balance");
    setLoggedIn(false);
    navigate("/");
  };

  return (
    <div>
      <div className="mobile-menu-button">
    <Menu 
      styles={{
        bmBurgerButton: {
          position: 'fixed',
          width: '36px',
          height: '30px',
          right: '20px', // Position on the right
          top: '3.5%',
        },
        bmBurgerBars: {
          background: '#A77F1A',
        },
        bmCrossButton: {
          height: '27px',
          width: '27px',
        },
        bmCross: {
          background: '#bdc3c7',
        },
        bmMenuWrap: {
          position: 'fixed',
          height: '100%',
        },
        bmMenu: {
          background: '#262626',
          padding: '2.5em 1.5em 0',
          fontSize: '1.15em',
          width: '200px', 
          
        },
        bmMorphShape: {
          fill: '#373a47',
        },
        bmItemList: {
          color: '#b8b7ad',
          padding: '0.8em',
        },
        bmItem: {
          display: 'inline-block',
          textDecoration: 'none',
          margin: '10px',
          color: '#9F8334',
        },
        bmOverlay: {
          background: 'rgba(0,0,0,0.3)',
          
        },
      }}
    >
      <Link className="menu-item" to="/">Home</Link>
      <Link  className="menu-item" to="/activation-history">Orders</Link>
      <Link  className="menu-item" to="/payment">{isLoggedIn?"Rs." + balance  : ""}</Link>
      <Link onClick={handleLogout} className="menu-item" to={isLoggedIn? "/":"/login"} >{isLoggedIn ? "Log-out":"Log-In"}</Link>
      
    </Menu>
    </div>
      <div className="desktop-menu">
         {/* Menu items for desktop view */}
         </div>
    </div>
  );
};

export default Example;
