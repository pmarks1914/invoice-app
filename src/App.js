import React, { Suspense, useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import InvoiceGenerator from './Invoice/Invoice';
import Login from './Login/Login'
import SignUp from './register/signup';
import ResetPassword from './AccountSetup/ResetPassword';
import ChangePassword from './AccountSetup/ChangePassword';
import FooterNavigation from './Footer/FooterNavigation';
import Dashboard from './Dashboard/Dashboard';
import DashboardViewInvoice from './Invoice/DashboardViewInvoice';
import Profile from './Profile/Profile';
import DefaultLayout from './DefaultLayout/DefaultLayout';


let userDataStore = JSON.parse(localStorage.getItem("userDataStore"));

function App() {
  const [footerManage, setFooterManage] = useState(false)
  // manage pages footer
  useEffect(()=> {
    if ( [ '/invoice', '/profile', '/home', '/dashboard-view-invoice'].includes(window.location.pathname) ) {
      console.log(window.location.pathname)
      setFooterManage(true)
    } 
  }, [])

  console.log(window.location.pathname)

  const loading = (
    <div className="pt-3 text-center">
      <div className="sk-spinner sk-spinner-pulse"></div>
    </div>
  )

  return (
    <Suspense fallback={loading}>
    <Router>
      <div style={{ flex: 1 }}>
        <Routes>
        <Route exact path="/" element={<Login />} />
        <Route exact path="/signup" element={ <SignUp /> } />
        <Route exact path="/reset-password" element={ <ResetPassword /> } />
        <Route exact path="/change-password" element={ <ChangePassword /> } />
        <Route exact path="/invoice" element={<InvoiceGenerator />} />
        <Route exact path="/home" element={<Dashboard />} />
        <Route exact path="/dashboard-view-invoice" element={<DashboardViewInvoice />  } />
        <Route exact path="/profile" element={<Profile />  } />
        
          {/* <Route exact path="/search" element={<Search />} />
          <Route exact path="/profile" element={<Profile />} />
          <Route exact path="/settings" element={<Settings />} /> */}

        
        {/* path access to footer */}
        {/* {
          footerManage ? 
          <FooterNavigation /> : ""
        } */}
        </Routes>
        {
              userDataStore?.access_key ?
              <FooterNavigation />
              : ""
            }
      </div>
    </Router>
    </Suspense>
  );
}

export default App;
