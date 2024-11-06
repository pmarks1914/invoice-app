import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import FooterNavigation from './FooterNavigation';
import './App.css';
import InvoiceGenerator from './Invoice/Invoice';
import Login from './Login/Login'
import SignUp from './register/signup';

function App() {
  return (
    <Router>
      <div style={{ flex: 1 }}>
        <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={ <SignUp /> } />
        {/* <Route path="/reset-password" element={ <SignUp /> } /> */}
        {/* <Route path="/" element={<InvoiceGenerator />} /> */}
          {/* <Route path="/search" element={<Search />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/settings" element={<Settings />} /> */}
        </Routes>
      </div>
      {/* <FooterNavigation /> */}
    </Router>
  );
}

export default App;
