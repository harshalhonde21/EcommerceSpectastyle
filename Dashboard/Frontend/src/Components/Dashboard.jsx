import AssessmentIcon from '@mui/icons-material/Assessment';
import HowToRegIcon from '@mui/icons-material/HowToReg';
import AllAgents from './AllAgents';
import AllUsers from './AllUsers';
import Products from './Products';
import ManagerLogin from './ManagerLogin';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import ProductionQuantityLimitsIcon from '@mui/icons-material/ProductionQuantityLimits';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import DashboardIcon from '@mui/icons-material/Dashboard';
import WarehouseIcon from '@mui/icons-material/Warehouse';
import { useState } from 'react';
import { Button } from '@mui/material';
import AllProducts from './AllProducts';
import '../css/Dashboard.css'

const Dashboard = () => {
  const [showRegistration, setShowRegistration] = useState(false);
  const [allusers, setAllusers] = useState(false);
  const [alltransition, setAlltransition] = useState(false);
  const [managerlogin, setmanagerlogin] = useState(false);
  const [userbalance, setuserbalance] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };


  const toggleRegistration = () => {
    setShowRegistration(!showRegistration);
    setAllusers(false)
    setAlltransition(false);
    setmanagerlogin(false);
    setuserbalance(false);
  };

  const toggleAllusers = () => {
    setAllusers(!allusers);
    setShowRegistration(false)
    setAlltransition(false);
    setmanagerlogin(false)
    setuserbalance(false);
  };

  const toggleAlltransition = () => {
    setAlltransition(!alltransition);
    setShowRegistration(false)
    setAllusers(false)
    setmanagerlogin(false)
    setuserbalance(false);
  };

  const togglemanagerlogin = () => {
    setmanagerlogin(!managerlogin);
    setShowRegistration(false)
    setAllusers(false)
    setAlltransition(false);
    setuserbalance(false);
  }

  const togglebalance = () => {
    setuserbalance(!userbalance);
    setShowRegistration(false)
    setAllusers(false)
    setAlltransition(false);
    setmanagerlogin(false)
  }



  return (
    <div className="Container">
      <nav>
        <h1><WarehouseIcon />&nbsp;WAREHOUSE&nbsp;<WarehouseIcon />&nbsp;&nbsp;&nbsp;<DashboardIcon />&nbsp;DASHBOARD&nbsp;<DashboardIcon /> <WarehouseIcon style={{position:'absolute', top:'-1rem', left:'30rem',color:'black', fontSize:'45rem', zIndex:'-1'}} /></h1>
        <div
          style={{
            position: "absolute",
            width: "13%",
            height: "1%",
            border: "2px solid white",
            top: "105%",
            left: "1%",
          }}
        ></div>
        <div
          style={{
            position: "absolute",
            width: "11%",
            height: "1%",
            border: "2px solid white",
            top: "120%",
            left: "1%",
          }}
        ></div>
        <div
          style={{
            position: "absolute",
            width: "9%",
            height: "1%",
            border: "2px solid white",
            top: "135%",
            left: "1%",
          }}
        ></div>
        <div
          style={{
            position: "absolute",
            width: "6%",
            height: "1%",
            border: "2px solid white",
            top: "150%",
            left: "1%",
          }}
        ></div>
      </nav>
      <div className="side-dash">
        <div className="outer-container">
          <h3 className='my-main-route' onClick={toggleDropdown}>
            <AssessmentIcon style={{ position: 'absolute', left: '-20%' }} />
            Super User ( Manager) <br /> (Agent)
          </h3>
          {showDropdown && (
            <>
          <div className="register-user" onClick={toggleRegistration}>
            <div>
              <HowToRegIcon style={{
                position: 'absolute',
                left: '-20%',
                top: '-5%',
                border: '2px solid white',
                width: '18px',
                height: '18px',
                color: 'rgb(78, 70, 182)',
                backgroundColor: 'white',
                borderRadius: '10px'
              }} />
            </div>
            <div style={{ marginLeft: '10px' }}>All Agents</div>
          </div>
          {showRegistration && <AllAgents />}

          <div className="All-myUser" onClick={toggleAllusers}>
            <div>
              <PeopleAltIcon style={{
                position: 'absolute',
                left: '-22%',
                top: '-5%',
                border: '2px solid white',
                width: '18px',
                height: '18px',
                color: 'rgb(78, 70, 182)',
                backgroundColor: 'white',
                borderRadius: '10px'
              }} />
            </div>
            <div style={{ marginLeft: '10px' }}>All Users</div>
          </div>
          {allusers && <AllUsers />}

          <div className="All-myUser" style={{ position: "absolute", top: "16%" }} onClick={toggleAlltransition}>
            <div>
              <ProductionQuantityLimitsIcon style={{
                position: 'absolute',
                left: '-10%',
                top: '40%',
                border: '2px solid white',
                width: '18px',
                height: '18px',
                color: 'rgb(78, 70, 182)',
                backgroundColor: 'white',
                borderRadius: '10px'
              }} />
            </div>
            <div style={{ marginLeft: '10px', marginTop:'12px' }}>Products Maniputlation</div>
          </div>
          {alltransition && <Products />}

          <div className="All-myUser" style={{ position: "absolute", top: "21%" }} onClick={togglebalance}>
            <div>
              <AccountBalanceWalletIcon style={{
                position: 'absolute',
                left: '-17%',
                top: '40%',
                border: '2px solid white',
                width: '18px',
                height: '18px',
                color: 'rgb(78, 70, 182)',
                backgroundColor: 'white',
                borderRadius: '10px'
              }} />
            </div>
            <div style={{ marginLeft: '10px', marginTop:'8px'  }}>All Products</div>
          </div>
          </>)}
          {userbalance && <AllProducts />}

          <div className="manager-login-bottom" style={{ position: 'absolute', top: '92%', left: '10%' }}>
            <Button onClick={togglemanagerlogin} style={{ backgroundColor: 'white', color:'black', fontWeight:'bold' }} variant='contained'>Login as Manager</Button>{' '}
          </div>

          {managerlogin && <ManagerLogin />}
        </div>
      </div>
      <div className="image-warehouse">
        <p><WarehouseIcon /></p>
      </div>
    </div>
  );
};

export default Dashboard;









