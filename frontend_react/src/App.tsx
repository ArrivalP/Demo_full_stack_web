import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, Navigate } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import Dashboard from './components/DashBoard';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS

const App: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(
    localStorage.getItem('isLoggedIn') === 'true'
  );

  useEffect(()=>{
    localStorage.setItem('isLoggedIn', String(isLoggedIn));
  },[isLoggedIn]);

  const handleLogin = () => {
    alert('Login successful!');
    setIsLoggedIn(!isLoggedIn);
  };
  const handleLogout = () => {
    alert('Logout successful!');
    setIsLoggedIn(false);
    window.location.href = '/login';
  };

  const handleRegister=()=>{
    alert('Register Successful!');
    window.location.href ='/login';
  };
  return (
    <Router>
      <div className="container mt-3">
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <div className="container-fluid">
            <div className='navbar-brand'>
              DemoApp
            </div>
            <div className="collapse navbar-collapse" id="navbarNav">
              <ul className="navbar-nav">
                {!isLoggedIn && (
                  <>
                    <li className="nav-item">
                      <Link to="/login" className="nav-link">
                        Login
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link to="/register" className="nav-link">
                        Register
                      </Link>
                    </li>
                  </>
                )}
                {isLoggedIn && (
                  <>
                    <li className="nav-item">
                      <Link to="/dashboard" className="nav-link">
                        Dashboard
                      </Link>
                    </li>
                    <li className="nav-item">
                      <button className="btn btn-link nav-link" onClick={handleLogout}>
                        Logout
                      </button>
                    </li>
                    {/* Add more navigation items for logged-in users */}
                  </>
                )}
              </ul>
            </div>
          </div>
        </nav>

        <Routes>
          <Route path="/login" element={<Login onLogin={handleLogin} />} />
          <Route path="/register" element={<Register onRegister={handleRegister}/>} />
          <Route
            path="/dashboard"
            element={isLoggedIn ? <Dashboard /> : <Navigate to="/login" />}
          />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
