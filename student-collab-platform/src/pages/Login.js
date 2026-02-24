import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [role, setRole] = useState('student'); // Default role
  const navigate = useNavigate(); // This hook helps us change pages

  const handleLogin = (e) => {
    e.preventDefault();
    // In Review 1, we just redirect based on the selected role
    if (role === 'admin') {
      navigate('/teacher');
    } else {
      navigate('/student');
    }
  };

  return (
    <div style={containerStyle}>
      <div style={loginCardStyle}>
        <h2 style={{ textAlign: 'center', color: '#333' }}>Project Portal Login</h2>
        <p style={{ textAlign: 'center', color: '#666', fontSize: '14px' }}>
          Manage your group projects effectively
        </p>
        
        <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '15px', marginTop: '20px' }}>
          <label style={{ fontWeight: 'bold' }}>Email Address</label>
          <input type="email" placeholder="Enter your college email" style={inputStyle} required />
          
          <label style={{ fontWeight: 'bold' }}>Select Your Role</label>
          <select 
            value={role} 
            onChange={(e) => setRole(e.target.value)} 
            style={inputStyle}
          >
            <option value="student">Student</option>
            <option value="admin">Teacher / Admin</option>
          </select>

          <button type="submit" style={buttonStyle}>
            Login to Dashboard
          </button>
        </form>
      </div>
    </div>
  );
};

// Styling Objects
const containerStyle = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  height: '90vh',
  backgroundColor: '#f0f2f5'
};

const loginCardStyle = {
  padding: '40px',
  backgroundColor: 'white',
  borderRadius: '10px',
  boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
  width: '350px'
};

const inputStyle = {
  padding: '10px',
  borderRadius: '5px',
  border: '1px solid #ddd',
  fontSize: '16px'
};

const buttonStyle = {
  padding: '12px',
  backgroundColor: '#007bff',
  color: 'white',
  border: 'none',
  borderRadius: '5px',
  fontSize: '16px',
  cursor: 'pointer',
  marginTop: '10px'
};

export default Login;