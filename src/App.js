import React from 'react';
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

function App() {
  return (
    <Router>
      <div style={{ flex: 1 }}>
        <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={ <SignUp /> } />
        <Route path="/reset-password" element={ <ResetPassword /> } />
        <Route path="/change-password" element={ <ChangePassword /> } />
        <Route path="/invoice" element={<InvoiceGenerator />} />
        <Route path="/home" element={<Dashboard />} />
        <Route path="/dashboard-view-invoice" element={<DashboardViewInvoice />  } />
        
          {/* <Route path="/search" element={<Search />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/settings" element={<Settings />} /> */}
        </Routes>
        <FooterNavigation />
      </div>
    </Router>
  );
}

export default App;
