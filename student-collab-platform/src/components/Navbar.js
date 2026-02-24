import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav style={{ 
      display: 'flex', 
      justifyContent: 'space-between', 
      padding: '1rem 2rem', 
      background: '#333', 
      color: '#fff' 
    }}>
      <div style={{ fontWeight: 'bold', fontSize: '1.2rem' }}>EduCollab</div>
      <div>
        <Link to="/" style={linkStyle}>Logout</Link>
        <Link to="/student" style={linkStyle}>Student</Link>
        <Link to="/teacher" style={linkStyle}>Teacher</Link>
      </div>
    </nav>
  );
};

const linkStyle = {
  color: 'white',
  marginLeft: '15px',
  textDecoration: 'none',
  fontSize: '0.9rem'
};
export default Navbar;